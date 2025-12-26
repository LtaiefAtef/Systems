using System;
using System.Runtime.Serialization;

namespace ServiceFacturation.Models
{
    [DataContract]
    public class Invoice
    {
        [DataMember] public int Id { get; set; }
        [DataMember] public string StudentId { get; set; } = string.Empty;
        [DataMember] public string Description { get; set; } = string.Empty;
        [DataMember] public double Amount { get; set; }
        [DataMember] public bool IsPaid { get; set; }
        [DataMember] public DateTime CreatedAt { get; set; }
        [DataMember] public DateTime? PaidAt { get; set; }
    }
}
