import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: '',
    nhapLaiMatKhau: '',
    hoTen: '',
    email: '',
    soDienThoai: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = formData.hoTen.trim() || formData.taiKhoan.trim() || 'bạn';
    localStorage.setItem('currentUserName', displayName);
    navigate('/');
  };


  
  return (
    <div className="container my-5 shadow rounded overflow-hidden bg-white" style={{ maxWidth: '900px' }}>
      <div className="row g-0 align-items-stretch" style={{ minHeight: '600px' }}>
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center position-relative">
          <div className="text-center text-secondary px-4 z-1">
            <h3 className="fw-light">Chào mừng</h3>
            <p className="small">Nhập thông tin để đăng ký.</p>
          </div>
        </div>
        <div className="col-12 col-md-6 p-4 p-lg-5 d-flex flex-column justify-content-center">
          <h2 className="text-uppercase fw-bold tracking-wide text-dark mb-4" style={{ letterSpacing: '1px' }}>ĐĂNG KÝ</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-3">
              <label className="form-label small text-muted fw-semibold mb-1">Tài khoản</label>
              <input type="text" name="taiKhoan" value={formData.taiKhoan} onChange={handleInputChange} className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" style={{ borderBottomColor: '#212529', transition: 'border-color 0.2s' }} required />
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted fw-semibold mb-1">Mật khẩu</label>
              <input type="password" name="matKhau" value={formData.matKhau} onChange={handleInputChange} className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent"  style={{ borderBottomColor: '#212529' }} required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted fw-semibold mb-1">Nhập lại mật khẩu</label>
              <input type="password" name="nhapLaiMatKhau" value={formData.nhapLaiMatKhau} onChange={handleInputChange} className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" style={{ borderBottomColor: '#212529' }} required />
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted fw-semibold mb-1">Họ tên</label>
              <input type="text" name="hoTen" value={formData.hoTen} onChange={handleInputChange} className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" style={{ borderBottomColor: '#212529' }} required />
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted fw-semibold mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" style={{ borderBottomColor: '#212529' }} required />
            </div>
            <div className="mb-4">
              <label className="form-label small text-muted fw-semibold mb-1">Số điện thoại</label>
              <input type="tel" name="soDienThoai" value={formData.soDienThoai} onChange={handleInputChange} className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" style={{ borderBottomColor: '#212529' }} required 
              />
            </div>
            <div className="d-flex align-items-center justify-content-start gap-3 pt-2">
              <button type="submit" className="btn btn-dark rounded-pill px-4 py-2 border border-dark fw-semibold shadow-sm transition-all text-white bg-dark hover-light-card" style={{ minWidth: '130px', borderRadius: '25px' }}>
                Đăng ký
              </button>
              <button type="button" onClick={() => navigate('/dangnhap')} className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold shadow-sm text-dark bg-transparent" style={{ minWidth: '130px', borderRadius: '25px' }}>
                Đã có tài khoản
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}










export function LogIn() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    taiKhoan: '',
    matKhau: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = loginData.taiKhoan.trim() || 'bạn';
    localStorage.setItem('currentUserName', displayName);
    navigate('/');
  };

  return (
    <div className="container my-5 shadow rounded overflow-hidden bg-white" style={{ maxWidth: '900px' }}>
      <div className="row g-0 align-items-stretch" style={{ minHeight: '500px' }}>
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center position-relative">
          <div className="text-center text-secondary px-4 z-1">
            <h3 className="fw-light">Chào mừng trở lại</h3>
            <p className="small">Đăng nhập tài khoản của bạn để tiếp tục đặt vé phim.</p>
          </div>
        </div>
        <div className="col-12 col-md-6 p-4 p-lg-5 d-flex flex-column justify-content-center">
          <h2 className="text-uppercase fw-bold text-dark mb-4" style={{ letterSpacing: '1px' }}>ĐĂNG NHẬP</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label small text-muted fw-semibold mb-1">Tài khoản</label>
              <input type="text" name="taiKhoan" value={loginData.taiKhoan} onChange={handleInputChange} className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" style={{ borderBottomColor: '#212529' }} required />
            </div>
            <div className="mb-5">
              <label className="form-label small text-muted fw-semibold mb-1">Mật khẩu</label>
              <input type="password" name="matKhau" value={loginData.matKhau} onChange={handleInputChange} className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" style={{ borderBottomColor: '#212529' }} required />
            </div>
            <div className="d-flex align-items-center justify-content-start gap-3 pt-2">
              <button type="submit" className="btn btn-dark rounded-pill px-4 py-2 border border-dark fw-semibold shadow-sm text-white bg-dark"style={{ minWidth: '130px', borderRadius: '25px' }}>
                Đăng nhập
              </button>
              <button type="button" onClick={() => navigate('/dangky')} className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold shadow-sm text-dark bg-transparent" style={{ minWidth: '130px', borderRadius: '25px' }}>
                Tạo tại khoản mới
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
