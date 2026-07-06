import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carouselIMG } from './sourceAPI/carousel.js';
import { movieIMG } from './sourceAPI/movie.js';
import { scheduleIMG } from './sourceAPI/schedule.js';
import Schedule from './schedule.jsx';
import './styles/main.scss';

export default function Movie() {
  const navigate = useNavigate();
  const [banner, setBanner] = useState([]);
  const [listPhim, setListPhim] = useState([]);
  const [listSchedule, setListSchedule] = useState([]);
  const [rapPhim, setRapPhim] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('currentUserName');
    window.location.reload();
  };





useEffect(() => {
  const loadData = async () => {
    try {
      const [carouselRes, movieRes, scheduleRes] = await Promise.all([
        carouselIMG(),
        movieIMG(),
        scheduleIMG(),
      ]);

      setBanner(carouselRes.data.content);
      setListPhim(movieRes.data.content);
      setListSchedule(scheduleRes.data.content);

      if (scheduleRes.data.content.length > 0) {
        setRapPhim(scheduleRes.data.content[0].maHeThongRap);
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadData();
}, []);







  return (
    <div>
      <header className="movie-header shadow">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src="./public/cgvlogo.png" alt="CGV" height="40"/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Trang chủ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Liên hệ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Tin tức</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Ứng dụng</a>
                </li>
              </ul>
              <div className="d-flex align-items-center">
                {currentUserName ? (
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-light fw-semibold">
                       Welcome,
                      <span className="text-warning ms-1"> {currentUserName}</span>
                    </span>
                    <button className="btn btn-warning" onClick={handleLogout}>Log out</button>
                  </div>
                ) : (
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-warning" onClick={() => navigate("/dangky")}>Đăng ký</button>
                    <button className="btn btn-warning" onClick={() => navigate("/dangnhap")}>Đăng nhập</button>
                    <button className="btn btn-primary" onClick={() => navigate("/admin")}>Admin</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>




      <main>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {banner.map((banner, index) => (
              <div  key={banner.maBanner} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={banner.hinhAnh} className="d-block w-100" style={{ maxHeight: '600px', objectFit: 'cover' }}  alt={`Banner ${banner.maPhim}`}/>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <h1 className="text-center my-5">Danh sách phim</h1>
        <div className="container my-3">
          <div className="row">
            {listPhim.map((phim) => (
              <div key={phim.maPhim} className="col-12 col-md-3 col-lg-2" style={{ cursor: 'pointer' }}
                onClick={() => {
                  localStorage.setItem('selectedMovie', JSON.stringify(phim));
                  navigate(`/detail/${phim.maPhim}`);
                }}>
                <img src={phim.hinhAnh} width="200px" height="250px" style={{ objectFit: 'cover' }} alt={phim.tenPhim} />
                <h4 className="fs-6 text-center">{phim.tenPhim}</h4>
              </div>
            ))}
          </div>
        </div>
        <h1 className="text-center my-5 fw-bold text-uppercase">Lịch chiếu hệ thống</h1>
        <Schedule listSchedule={listSchedule} activeCinemaSystem={rapPhim}  setActiveCinemaSystem={setRapPhim}/>
      </main>









      <footer className="bg-dark text-light pt-5 pb-3 mt-5">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3 text-warning">
                <i className="fa-solid fa-film me-2"></i>
                CGV Việt Nam
              </h5>
              <ul className="list-unstyled">
                <li><a href="#" className="footer-link">Giới Thiệu</a></li>
                <li><a href="#" className="footer-link">Tiện Ích Online</a></li>
                <li><a href="#" className="footer-link">Thẻ Quà Tặng</a></li>
                <li><a href="#" className="footer-link">Tuyển Dụng</a></li>
                <li><a href="#" className="footer-link">Liên Hệ Quảng Cáo</a></li>
                <li><a href="#" className="footer-link">Đối Tác</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3 text-warning">
                Điều Khoản
              </h5>
              <ul className="list-unstyled">
                <li><a href="#" className="footer-link">Điều Khoản Chung</a></li>
                <li><a href="#" className="footer-link">Điều Khoản Giao Dịch</a></li>
                <li><a href="#" className="footer-link">Chính Sách Thanh Toán</a></li>
                <li><a href="#" className="footer-link">Chính Sách Bảo Mật</a></li>
                <li><a href="#" className="footer-link">Quy Định Tại Rạp</a></li>
                <li><a href="#" className="footer-link">FAQ</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3 text-warning">
                Kết Nối Với Chúng Tôi
              </h5>
              <div className="d-flex gap-3 fs-3">
                <a href="https://facebook.com" className="social-icon">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="https://youtube.com" className="social-icon">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://instagram.com" className="social-icon">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://zalo.me" className="social-icon">
                  <i className="fa-solid fa-comment-dots"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3 text-warning">
                Chăm Sóc Khách Hàng
              </h5>
              <p>
                <i className="fa-solid fa-phone me-2"></i>
                1900 6017
              </p>
              <p>
                <i className="fa-solid fa-clock me-2"></i>
                08:00 - 22:00
              </p>
              <p>
                <i className="fa-solid fa-envelope me-2"></i>
                hoidap@cgv.vn
              </p>
            </div>
          </div>
          <hr className="border-secondary my-4" />
          <div className="text-center text-secondary">
            © 2026 CGV Việt Nam. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}