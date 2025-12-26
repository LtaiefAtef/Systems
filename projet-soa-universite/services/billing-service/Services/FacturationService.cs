using System;
using System.Collections.Generic;
using System.Linq;
using ServiceFacturation.Models;

namespace ServiceFacturation.Services
{
    public class FacturationService : IFacturationService
    {
        private static readonly List<Invoice> _invoices = new();
        private static int _nextId = 1;
        public List<Invoice> GetAllInvoices()
        {   
            return _invoices;
        }
        public Invoice GetInvoiceById(int id)
        {
            return _invoices.FirstOrDefault(x => x.Id == id);
        }

        public List<Invoice> GetInvoicesByStudent(string studentId)
        {
            return _invoices.Where(x => x.StudentId == studentId).ToList();
        }

        public Invoice CreateInvoice(string studentId, double amount, string description)
        {
            var invoice = new Invoice
            {
                Id = _nextId++,
                StudentId = studentId,
                Amount = amount,
                Description = description,
                CreatedAt = DateTime.UtcNow,
                IsPaid = false
            };

            _invoices.Add(invoice);
            return invoice;
        }

        public bool PayInvoice(int invoiceId)
        {
            var inv = _invoices.FirstOrDefault(i => i.Id == invoiceId);
            if (inv == null || inv.IsPaid) return false;

            inv.IsPaid = true;
            inv.PaidAt = DateTime.UtcNow;
            return true;
        }
    }
}
