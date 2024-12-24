using System;
using System.Text;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using DotNetEnv;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

var builder = WebApplication.CreateBuilder(args);
DotNetEnv.Env.Load();

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile("firebase/serviceAccountKey.json")
});

// Set up environment variable for JWT Secret
var JwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");
if (string.IsNullOrEmpty(JwtSecret) || JwtSecret.Length < 16)
{
    throw new InvalidOperationException("JWT_SECRET environment variable is not set.");
}

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSecret)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowSpecificOrigins",
    policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:8000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
builder.Services.AddAuthorization(opt =>
    opt.AddPolicy("AdminOnly", policy =>
        policy.RequireClaim("isAdmin", "True")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<PasswordService>();
builder.Services.AddSingleton(new JwtService(JwtSecret));
builder.Services.AddScoped<FirebaseService>();

// Database configuration
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

if (string.IsNullOrEmpty(databaseUrl))
{
    throw new InvalidOperationException("DATABASE_URL environment variable is not set.");
}

var uri = new Uri(databaseUrl);
var host = uri.Host;
var port = uri.Port;
var database = uri.AbsolutePath.TrimStart('/');
var username = uri.UserInfo.Split(':')[0];
var password = uri.UserInfo.Split(':')[1];

var connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=True";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));
Console.WriteLine("Using connection string: " + connectionString);



var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();


Console.WriteLine("Starting the server...");
app.Run();
Console.WriteLine("Server is running");
