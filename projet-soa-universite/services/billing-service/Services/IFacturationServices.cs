using System.Collections.Generic;
using System.ServiceModel;
using ServiceFacturation.Models;

namespace ServiceFacturation.Services
{
    [ServiceContract]
    public interface IFacturationService
    {
        [OperationContract]
        List<Invoice> GetAllInvoices();
        [OperationContract]
        Invoice GetInvoiceById(int id);

        [OperationContract]
        List<Invoice> GetInvoicesByStudent(string studentId);

        [OperationContract]
        Invoice CreateInvoice(string studentId, double amount, string description);

        [OperationContract]
        bool PayInvoice(int invoiceId);
    }
}
