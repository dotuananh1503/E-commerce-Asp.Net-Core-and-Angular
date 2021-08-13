using System.Threading.Tasks;

namespace MangaEcommerce.Helper
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}