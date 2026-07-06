import React from "react";
import { Link } from "react-router-dom";


export default function Schedule({
  listSchedule,
  activeCinemaSystem,
  setActiveCinemaSystem,
}) {
  const currentSystem = listSchedule.find(
    (item) => item.maHeThongRap === activeCinemaSystem
  );





  return (
    <div className="container my-5 border rounded shadow-sm bg-white p-0 overflow-hidden">
      <div className="row g-0">
        <div className="col-2 col-md-1 border-end bg-light d-flex flex-column align-items-center py-3 gap-3">
          {listSchedule.map((system) => {
            const isActive =
              system.maHeThongRap === activeCinemaSystem;
            return (
              <button key={system.maHeThongRap} onClick={() => setActiveCinemaSystem(system.maHeThongRap)}
                className={`btn p-1 rounded-circle ${
                  isActive
                    ? "border border-2 border-danger bg-white"
                    : "opacity-70"
                }`}>
                <img src={system.logo} alt={system.tenHeThongRap} width={50} height={50} className="rounded-circle"/>
              </button>
            );
          })}
        </div>
        <div className="col-10 col-md-11" style={{ maxHeight: "600px", overflowY: "auto" }}>
          {!currentSystem ? (
            <p className="p-3">Không có dữ liệu.</p>
          ) : (
            <div className="p-3">
              {currentSystem.lstCumRap?.map((cinema) => (
                <div key={cinema.maCumRap} className="mb-5">
                  <div className="bg-dark text-white p-2 rounded mb-3">
                    <h4 className="fs-5 mb-0 text-warning">📍 {cinema.tenCumRap}</h4>
                    <small className="opacity-75">{cinema.diaChi}</small>
                  </div>
                  {cinema.danhSachPhim?.map((movie) => {
                    const schedules =
                      movie.lstLichChieuTheoPhim?.slice(0, 12) || [];
                    return (
                      <div key={movie.maPhim}className="row mb-3 mx-0 bg-light p-3 rounded border" >
                        <div className="col-auto">
                          <img src={movie.hinhAnh} alt={movie.tenPhim} className="rounded border" style={{ width: 85, height: 120, objectFit: "cover",}}/>
                        </div>
                        <div className="col">
                          <h5 className="fs-6 fw-bold text-dark">
                            {movie.tenPhim}
                          </h5>
                          <div className="d-flex flex-wrap gap-2 mt-3">
                            {schedules.map((schedule) => {
                              const time = new Date(
                                schedule.ngayChieuGioChieu
                              ).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                              return (
                                <Link
                                  key={schedule.maLichChieu}
                                  to={`/datve/${schedule.maLichChieu}`}
                                  className="btn btn-outline-success btn-sm"
                                >
                                  {time}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
