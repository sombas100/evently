using System;
using FirebaseAdmin.Auth;
using System.Threading.Tasks;

namespace server.Services
{
    public class FirebaseService
    {
        public async Task<string> VerifyToken(string idToken)
        {
            try
            {
                var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
                return decodedToken.Uid;
            }
            catch (FirebaseAuthException ex)
            {
                throw new Exception("Invalid ID token", ex);
            }
        }
    }
}