from django.db import models
class CauHinhHeThong(models.Model):
    ten_tham_so = models.CharField(max_length=50, default="tong_luot_tim", unique=True)
    gia_tri_so = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.ten_tham_so}: {self.gia_tri_so}"
class LuuBut(models.Model):
    ho_ten = models.CharField(max_length=100, verbose_name="Họ tên")
    noi_dung = models.TextField(verbose_name="Lời nhắn")
    hinh_anh = models.URLField(max_length=1000, blank=True, null=True, verbose_name="Link hình ảnh") # Dòng mới thêm
    ngay_tao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ho_ten} - {self.ngay_tao.strftime('%d/%m/%Y')}"