from django.shortcuts import render, redirect, get_object_or_404
from .models import LuuBut
import cloudinary
import cloudinary.uploader
from django.shortcuts import render
from django.http import JsonResponse
from .models import CauHinhHeThong

# 1. View hiển thị trang chủ
def trang_chu(request):
    # Lấy tổng số tim hiện tại từ DB, nếu chưa có thì mặc định là 0
    tim_obj, created = CauHinhHeThong.objects.get_or_create(ten_tham_so="tong_luot_tim")
    
    context = {
        'so_luot_tim': tim_obj.gia_tri_so
    }
    return render(request, 'home.html', context)

# 2. View nhận sự kiện bấm nút thả tim từ Javascript gửi lên
def tang_luot_tim(request):
    if request.method == 'POST':
        tim_obj, created = CauHinhHeThong.objects.get_or_create(ten_tham_so="tong_luot_tim")
        tim_obj.gia_tri_so += 1  # Tăng lên 1 tim
        tim_obj.save()           # Lưu lại vào database
        
        # Trả số tim mới nhất về cho giao diện hiển thị lập tức
        return JsonResponse({'status': 'success', 'so_luot_tim': tim_obj.gia_tri_so})
    return JsonResponse({'status': 'failed'}, status=400)
# --- CẤU HÌNH ĐÁM MÂY LƯU ẢNH CLOUDINARY ---
cloudinary.config( 
  cloud_name = "dlpch48h0", 
  api_key = "399997547736215", 
  api_secret = "w72wVyzWY9G2iLZ_IgayAj2x85k",
  secure = True
)

def get_home(request):
    return render(request, 'home/home.html')

# --- Xem và Thêm lưu bút ---
def luu_but_view(request):
    if request.method == 'POST':
        ho_ten = request.POST.get('ho_ten')
        noi_dung = request.POST.get('noi_dung')
        
        # Lấy file ảnh đính kèm trực tiếp từ máy tính
        hinh_anh_file = request.FILES.get('hinh_anh')
        hinh_anh_url = ""
        
        # Nếu có chọn ảnh, tiến hành đẩy lên mây tự động
        if hinh_anh_file:
            try:
                upload_result = cloudinary.uploader.upload(hinh_anh_file)
                hinh_anh_url = upload_result.get('secure_url') # Lấy link ảnh dạng https
            except Exception as e:
                print(f"Lỗi tải ảnh lên Cloudinary: {e}")
        
        if ho_ten and noi_dung:
            LuuBut.objects.create(ho_ten=ho_ten, noi_dung=noi_dung, hinh_anh=hinh_anh_url)
        return redirect('luu_but_page')
        
    danh_sach_luu_but = LuuBut.objects.all().order_by('-ngay_tao')
    return render(request, 'home/luubut.html', {'danh_sach_luu_but': danh_sach_luu_but})

# --- Xóa lưu bút ---
def xoa_luu_but(request, id):
    note = get_object_or_404(LuuBut, id=id)
    note.delete()
    return redirect('luu_but_page')

# --- Sửa lưu bút ---
def sua_luu_but(request, id):
    note = get_object_or_404(LuuBut, id=id)
    if request.method == 'POST':
        note.ho_ten = request.POST.get('ho_ten')
        note.noi_dung = request.POST.get('noi_dung')
        
        # Nếu sửa và chọn file ảnh mới từ máy
        hinh_anh_file = request.FILES.get('hinh_anh')
        if hinh_anh_file:
            try:
                upload_result = cloudinary.uploader.upload(hinh_anh_file)
                note.hinh_anh = upload_result.get('secure_url')
            except Exception as e:
                print(f"Lỗi tải ảnh sửa đổi: {e}")
                
        note.save()
        return redirect('luu_but_page')
    
    return render(request, 'home/sua_luubut.html', {'note': note})