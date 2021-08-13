using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace MangaEcommerce.Models.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Chờ xác nhận")]
        Pending,
        [EnumMember(Value = "Đang xử lý")]
        Accepted,
        [EnumMember(Value = "Đang vận chuyển")]
        Shipping,
        [EnumMember(Value = "Giao hàng thành công")]
        PaymentReceived,
        [EnumMember(Value = "Giao hàng thất bại")]
        PaymentFailed,
        [EnumMember(Value = "Đã hủy")]
        Canceled,
    }
}
