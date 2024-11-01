using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Registration
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RegistrationId { get; set; }

        [Required]
        public int UserId { get; set; }
        [Required]
        public int EventId { get; set; }
        public DateTime RegistrationDate { get; set; } = DateTime.Now;

        public User User { get; set; }
        public Event Event { get; set; }
    }
}
