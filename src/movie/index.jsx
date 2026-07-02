import React, {useState, useEffect, use} from 'react'
import {carouselIMG} from './sourceAPI/carousel.js'
import {movieIMG} from './sourceAPI/movie.js'
import { cinemaIMG } from './sourceAPI/cinema.js';
import { scheduleIMG } from './sourceAPI/schedule.js';

export default function Movie() {

  const [banner, setBanner] = useState([]);
  const [listPhim, setListPhim] = useState([]);
  const [listCinema, setListCinema] = useState([]);
  const [listSchedule, setListSchedule] = useState([]);

  useEffect(() => {
    const getCarousel = async () => {
      try{
        const result = await carouselIMG();
        console.log(result.data.content);
        setBanner(result.data.content);
      }catch (error){
        console.error(error);
      }
    }
    getCarousel();
  }, [])

  useEffect(() => {
    const getPhim = async () => {
      try{
        const result = await movieIMG();
        console.log(result.data.content);
        setListPhim(result.data.content);
      }catch (error){
        console.error(error);
      }
    }
    getPhim();
  }, [])

  useEffect(()=> {
    const getCinema = async () => {
      try{
        const result = await cinemaIMG();
        console.log(result.data.content);
        setListCinema(result.data.content);
      }catch (error){
        console.error(error);
      }
    }
    getCinema();
  }, [])

  useEffect(() => {
    const getSchedule = async () => {
      try{
        const result = await scheduleIMG();
        console.log(result.data.content);
        setListSchedule(result.data.content);
      }catch (error){
        console.error(error);
      }
    }
  }, [])

  return (
    <div>
      <header>
        <div className='container'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="./public/cgvlogo.png" alt="movie" width="auto" height="30"></img>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Liên hệ</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Tin tức</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Ứng dụng</a>
                        </li>
                    </ul>
                <form className="d-flex" role="search">
                    <button className="btn btn-outline-dark me-2" type="submit">Đăng ký</button>
                    <button className="btn btn-outline-dark" type="submit">Đăng nhập</button>
                </form>
                </div>
            </div>
        </nav>
        </div>

      </header>





      <main>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {banner.map((banner, index) => (
              <div 
                key={banner.maBanner} 
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
              >
                <img 
                  src={banner.hinhAnh} 
                  className="d-block w-100"
                  style={{maxHeight: '600px', objectFit:'cover'}} 
                  alt={`Banner ${banner.maPhim}`} 
                />
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






            <h1 className='text-center my-5'>Danh sách phim</h1>
            <div className='container my-3'>
              <div className='row'>
                {listPhim.map((listPhim, index) =>
                  <div key={listPhim.maPhim} className='col-12 col-md-3 col-lg-2'>
                    <img src={listPhim.hinhAnh} width='200px' height='250px' style={{objectFit:'cover'}} alt={listPhim.tenPhim} />
                    <h4 className='fs-6 text-center'>{listPhim.tenPhim}</h4>
                  </div>                                                                                                                         
                )}
              </div>
            </div>


            <div className='d-flex'>
              <div className = 'container'>
                {listCinema.map((listCinema, index) =>
                  <div key={listCinema.maHeThongRap}>
                    <img src={listCinema.logo} width = '100px' height = '100px' alt={listCinema.tenHeThongRap} />  
                  </div>
                )}
              </div>


              <div className='container'>
                {listSchedule.map((listSchedule, index) =>
                  <div key={listSchedule.maLichChieu}>
                    <img src={listSchedule.hinhAnh} width = '100px' height = '100px' alt={listSchedule.tenPhim} />
                  </div>
                )}
              </div>
              <div className='container'>
                <h1>Hello</h1>
              </div> 
            </div>
            
        </main>




        <footer>
          <div className='row'>
            <div className='col-12 col-md-3 col-mb-2'>
              <h1>CGV Việt Nam</h1>
              <p>Giới Thiệu</p>
              <p>Tiện Ích Online</p>
              <p>Thẻ Quà Tặng</p>
              <p>Tuyển Dụng</p>
              <p>Liên Hệ Quảng Cáo CGV</p>
              <p>Dành Cho Đối Tác</p>
            </div>
            <div className='col-12 col-md-3 col-mb-2'>
              <h1>Điều khoản sử dụng</h1>
              <p>Điều Khoản Chung</p>
              <p>Điều Khoản Giao Dịch</p>
              <p>Chính Sách Thanh Toán</p>
              <p>Chính Sách Bảo Mật</p>
              <p>Những Quy Định Tại Rạp Phim</p>
              <p>Câu Hỏi Thường Gặp</p>
            </div>
            <div className='col-12 col-md-3 col-mb-2'>
              <h1>Kết nối với chúng tôi</h1>
              <a className='follow-fb'></a>
              <a href="https://facebook.com"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://youtube.com"><i className="fa-brands fa-youtube"></i></a>
              <a href="https://instagram.com"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://zalo.me"><i className="fa-solid fa-comment-dots"></i></a>
            </div>
            <div className='col-12 col-md-3 col-mb-2'>
              <h1>Chăm sóc khách hàng</h1>
              <p>Hotline: 1900 6017</p>
              <p>Giờ làm việc: 8:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ Tết)</p>
              <p>Email hỗ trợ: hoidap@cgv.vn</p>
            </div>
          </div>
        </footer>
    </div>
  ) 
}
