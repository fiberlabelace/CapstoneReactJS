import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



const api = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim',
  headers: {
    TokenCybersoft:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjA0LzEyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc5NjM0MjQwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk2NDkwMDAwfQ.DcungLS2D0-V5FlObrQNV283QRSfZfrw3c0RHFR02Q',
  },
});
const api2 = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyRap',
  headers: {
    TokenCybersoft:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjA0LzEyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc5NjM0MjQwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk2NDkwMDAwfQ.DcungLS2D0-V5FlObrQNV283QRSfZfrw3c0RHFR02Q',
  },
});




function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [rapDangChon, setRapDangChon] = useState('');
  const [ngayDangChon, setNgayDangChon] = useState(0);
  const [dsNgay, setDsNgay] = useState([]);
  useEffect(() => {
    getMovieData();
  }, [id]);
  async function getMovieData() {
    try {
      const oldMovie = JSON.parse(localStorage.getItem('selectedMovie') || 'null');
      const res1 = await api.get('/LayThongTinPhim', { params: { MaPhim: id } });
      const res2 = await api2.get('/LayThongTinLichChieuPhim', { params: { MaPhim: id } });
      console.log('res1', res1.data);
      console.log('res2', res2.data);
      const infoPhim = res1.data.content || {};
      const lichChieu = res2.data.content || {};
      let dataMoi = Object.assign({}, oldMovie, infoPhim, lichChieu);



      if (!dataMoi.tenPhim) dataMoi.tenPhim = oldMovie ? oldMovie.tenPhim : 'Movie ' + id;
      if (!dataMoi.hinhAnh) dataMoi.hinhAnh = 'https://via.placeholder.com/500x750?text=Movie+Poster';
      if (!dataMoi.moTa) dataMoi.moTa = 'No description available for this movie yet.';
      setMovie(dataMoi);
      const heThong = dataMoi.heThongRapChieu || [];
      if (heThong.length > 0) {
        setRapDangChon(heThong[0].maHeThongRap);
      }
      let mangNgay = [];
      for (let i = 0; i < heThong.length; i++) {
        const cumRaps = heThong[i].cumRapChieu || [];
        for (let j = 0; j < cumRaps.length; j++) {
          const lich = cumRaps[j].lichChieuPhim || [];
          for (let k = 0; k < lich.length; k++) {
            if (lich[k].ngayChieuGioChieu) {
              mangNgay.push(lich[k].ngayChieuGioChieu);
            }
          }
        }
      }
      const tenThu = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
      let ngayKhongTrung = [...new Set(mangNgay.map((n) => n.slice(0, 10)))];
      let ngayFormat = ngayKhongTrung.map((str, idx) => {
        let d = new Date(str + 'T00:00:00');
        return {
          thu: tenThu[d.getDay()],
          ngay: String(d.getDate()).padStart(2, '0'),
          fullNgay: str,
          isRed: idx === 0,
        };
      });
      setDsNgay(ngayFormat);
      setNgayDangChon(0);
    } catch (err) {
      console.log('loi load phim', err);
      const oldMovie = JSON.parse(localStorage.getItem('selectedMovie') || 'null');
      setMovie(
        oldMovie || {
          tenPhim: 'Movie ' + id,
          hinhAnh: 'https://via.placeholder.com/500x750?text=Movie+Poster',
          moTa: 'No description available for this movie yet.',
          heThongRapChieu: [],
        },
      );
    }
  }





  if (!movie) {
    return (
      <div className="text-center my-5 p-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  const dsHeThong = movie.heThongRapChieu || [];
  const heThongDangXem = dsHeThong.find((h) => h.maHeThongRap === rapDangChon);
  const ngaySelected = dsNgay[ngayDangChon] ? dsNgay[ngayDangChon].fullNgay : '';



  
  return (
    <div className="bg-white min-vh-100 font-sans">
      <div
        className="text-white py-5 position-relative"
        style={{ background: 'radial-gradient(circle, #1a2238 0%, #080c14 100%)', minHeight: '450px' }}
      >
        <div className="container">
          <div className="mb-4 small opacity-75">
            Trang chủ | <span className="text-uppercase font-monospace">{movie.tenPhim}</span>
          </div>
          <div className="row g-4 align-items-start">
            <div className="col-12 col-md-4 col-lg-3 text-center text-md-start">
              <img
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                className="img-fluid rounded shadow-lg bg-white p-1"
                style={{ width: '100%', maxHeight: '380px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <h2 className="fw-bold tracking-wide text-uppercase mb-3">{movie.tenPhim}</h2>
              <p className="small text-light opacity-75 lh-base mb-4" style={{ maxWidth: '750px' }}>
                {movie.moTa}
              </p>
              <div className="row g-2 mb-4 fs-7 text-capitalize" style={{ fontSize: '0.9rem' }}>
                <div className="col-4 col-sm-2 text-muted fw-semibold">Đạo Diễn:</div>
                <div className="col-8 col-sm-10 text-white-50">{movie.daoDien || '-'}</div>
                <div className="col-4 col-sm-2 text-muted fw-semibold">Diễn Viên:</div>
                <div className="col-8 col-sm-10 text-white-50">{movie.dienVien || '-'}</div>
                <div className="col-4 col-sm-2 text-muted fw-semibold">Thể Loại:</div>
                <div className="col-8 col-sm-10 text-white-50">{movie.theLoai || '-'}</div>
                <div className="col-4 col-sm-2 text-muted fw-semibold">Khởi Chiếu:</div>
                <div className="col-8 col-sm-10 text-white-50">{movie.ngayKhoiChieu || '-'}</div>
                <div className="col-4 col-sm-2 text-muted fw-semibold">Thời Lượng:</div>
                <div className="col-8 col-sm-10 text-white-50">{movie.thoiLuong || '-'}</div>
                <div className="col-4 col-sm-2 text-muted fw-semibold">Ngôn Ngữ:</div>
                <div className="col-8 col-sm-10 text-white-50">{movie.ngonNgu || '-'}</div>
              </div>
              <div className="d-flex flex-wrap gap-2 pt-2">
                <button className="btn btn-success rounded px-4 py-2 fw-semibold text-uppercase btn-sm">
                  Xem Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>





      <div className="container my-5">
        <div className="row g-0 border rounded shadow-sm bg-white overflow-hidden">
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 border-end bg-white">
            <div className="d-flex flex-column align-items-stretch">
              {dsHeThong.length > 0 ? (
                dsHeThong.map((h) => (
                  <button
                    key={h.maHeThongRap}
                    onClick={() => setRapDangChon(h.maHeThongRap)}
                    className={
                      'btn rounded-0 text-start border-bottom d-flex align-items-center gap-2 px-3 py-3 w-100 ' +
                      (rapDangChon === h.maHeThongRap ? 'bg-light border-start border-4 border-warning fw-bold' : '')
                    }
                    style={{ minHeight: '70px' }}
                  >
                    <img src={h.logo} alt={h.tenHeThongRap} width="35" height="35" className="rounded-circle shadow-sm" />
                    <span className="small text-dark d-none d-md-inline fw-semibold">{h.tenHeThongRap}</span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-muted small">Chưa có lịch chiếu cho phim này.</div>
              )}
            </div>
          </div>

          <div className="col-8 col-sm-9 col-md-9 col-lg-9 d-flex flex-column">
            <div
              className="d-flex overflow-x-auto border-bottom align-items-center scrollbar-none"
              style={{ whiteSpace: 'nowrap', backgroundColor: '#fafafa' }}
            >
              {dsNgay.map((tab, idx) => (
                <button
                  key={tab.fullNgay}
                  onClick={() => setNgayDangChon(idx)}
                  className={
                    'btn rounded-0 py-2 px-3 border-end text-center d-flex flex-column align-items-center justify-content-center flex-grow-1 ' +
                    (ngayDangChon === idx ? 'bg-white shadow-sm border-bottom border-2 border-danger' : '')
                  }
                  style={{ minWidth: '85px', height: '65px' }}
                >
                  <span className={'small fw-semibold m-0 ' + (tab.isRed ? 'text-danger' : 'text-muted')} style={{ fontSize: '0.8rem' }}>
                    {tab.thu}
                  </span>
                  <span className={'fw-bold mt-1 ' + (tab.isRed ? 'text-danger' : 'text-dark')} style={{ fontSize: '1.1rem' }}>
                    {tab.ngay}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-4" style={{ height: '480px', overflowY: 'auto' }}>
              {heThongDangXem && heThongDangXem.cumRapChieu && heThongDangXem.cumRapChieu.length > 0 ? (
                heThongDangXem.cumRapChieu.map((cum) => {
                  let suatLoc = [];
                  const dsLich = cum.lichChieuPhim || [];
                  for (let i = 0; i < dsLich.length; i++) {
                    if (!ngaySelected || (dsLich[i].ngayChieuGioChieu && dsLich[i].ngayChieuGioChieu.startsWith(ngaySelected))) {
                      suatLoc.push(dsLich[i]);
                    }
                  }
                  return (
                    <div key={cum.maCumRap} className="mb-4 pb-4 border-bottom">
                      <div className="mb-3">
                        <h6 className="fw-bold text-dark mb-1">
                          <span className="text-warning small me-1">⬤</span> {cum.tenCumRap}
                        </h6>
                        <p className="text-muted mb-0 small" style={{ fontSize: '0.8rem' }}>
                          {cum.diaChi} - <span className="text-danger style-pointer">[Bản đồ]</span>
                        </p>
                      </div>
                      {suatLoc.length > 0 ? (
                        <div className="d-flex align-items-start gap-3">
                          <div className="pt-1">
                            <span className="badge bg-secondary text-white px-2 py-1 fw-bold font-monospace" style={{ fontSize: '0.7rem' }}>
                              2D DIGITAL
                            </span>
                          </div>










                          
                          <div className="d-flex flex-wrap gap-2 flex-grow-1">
                            {suatLoc.map((slot) => {
                              let gioHienThi = 'N/A';
                              if (slot.ngayChieuGioChieu) {
                                const dGio = new Date(slot.ngayChieuGioChieu);
                                gioHienThi = dGio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                              } else if (slot.gioChieu) {
                                gioHienThi = slot.gioChieu;
                              }
                              return (
                                <button
                                  key={slot.maLichChieu}
                                  onClick={() => navigate('/datve/' + slot.maLichChieu)}
                                  className="btn btn-outline-secondary btn-sm fw-bold px-3 py-2 text-success bg-light border-light-subtle shadow-sm"
                                  style={{ letterSpacing: '0.3px', minWidth: '70px' }}
                                >
                                  {gioHienThi}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted small ps-4 fst-italic">Không tìm thấy suất chiếu khả dụng cho ngày được chọn.</div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-muted py-5">
                  <p className="mb-0">Hệ thống rạp hiện tại chưa ghi nhận lịch chiếu của phim này.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;