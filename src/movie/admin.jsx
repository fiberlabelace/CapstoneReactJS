import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialFilms = [
  { maPhim: 1314, hinhAnh: 'https://picsum.photos/id/101/50/60', tenPhim: 'Mỹ Toàn', moTa: 'phim hay quá' },
  { maPhim: 1329, hinhAnh: 'https://picsum.photos/id/102/50/60', tenPhim: 'Bố Già Rồi', moTa: 'Tui coi rồi nên tui biết' },
  { maPhim: 1344, hinhAnh: 'https://picsum.photos/id/103/50/60', tenPhim: 'Avenger', moTa: 'Giám Mục Bóng Tối (Woo Do Hwan) – tên quỷ Satan độ ...' },
  { maPhim: 1359, hinhAnh: 'https://picsum.photos/id/104/50/60', tenPhim: 'Vợ 3', moTa: 'hay' },
  { maPhim: 1374, hinhAnh: 'https://picsum.photos/id/106/50/60', tenPhim: 'Natra Two 3', moTa: 'abababababab' },
  { maPhim: 1389, hinhAnh: 'https://picsum.photos/id/107/50/60', tenPhim: 'Diệp Vấn', moTa: 'Diệp Vấn là một bộ phim điện ảnh võ thuật bán tiểu ...' },
  { maPhim: 1404, hinhAnh: 'https://picsum.photos/id/108/50/60', tenPhim: 'Mắt Biếc', moTa: 'Trứng rán cần mỡ, bắp cần bơ, yêu không cần cớ, cả ...' },
  { maPhim: 1415, hinhAnh: 'https://picsum.photos/id/111/50/60', tenPhim: 'Bỗng dưng trúng số', moTa: 'Bộ phim hài hước Hàn Quốc gây bão phòng vé về những quân nhân và tấm vé số độc đắc.' },
  { maPhim: 1420, hinhAnh: 'https://picsum.photos/id/112/50/60', tenPhim: 'Deadpool & Wolverine', moTa: 'Màn kết hợp bùng nổ vũ trụ điện ảnh Marvel giữa hai siêu anh hùng lầy lội nhất.' },
  { maPhim: 1435, hinhAnh: 'https://picsum.photos/id/113/50/60', tenPhim: 'THÁM TỬ LỪNG DANH CONAN: NGÔI SAO 5 CÁNH 1 TRIỆU ĐÔ', moTa: 'Hành trình phá án nghẹt thở tiếp theo của Conan tại Hakodate cùng với siêu trộm Kaito Kid.' },
  { maPhim: 1450, hinhAnh: 'https://picsum.photos/id/114/50/60', tenPhim: 'MAI', moTa: 'Bộ phim tâm lý tình cảm sâu sắc của đạo diễn Trấn Thành đạt doanh thu kỷ lục.' },
  { maPhim: 1465, hinhAnh: 'https://picsum.photos/id/115/50/60', tenPhim: 'HÀNG XÓM CỦA TÔI LÀ TOTORO', moTa: 'Tác phẩm hoạt hình kinh điển đầy ấm áp và kỳ diệu đến từ Studio Ghibli.' },
  { maPhim: 1480, hinhAnh: 'https://picsum.photos/id/116/50/60', tenPhim: 'Móng vuốt', moTa: 'Phim kinh dị giật gân Việt Nam xoay quanh cuộc chiến sinh tồn trước ác thú trong rừng sâu.' }
];






export default function Admin() {
  const [films, setFilms] = useState(initialFilms);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFilm, setCurrentFilm] = useState({ maPhim: '', tenPhim: '', hinhAnh: '', moTa: '' });
  const handleDelete = (maPhim) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa phim có mã ${maPhim}?`)) {
      setFilms(films.filter(film => film.maPhim !== maPhim));
    }
  };
  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentFilm({ maPhim: Date.now(), tenPhim: '', hinhAnh: '', moTa: '' });
    setShowModal(true);
  };
  const openEditModal = (film) => {
    setIsEditMode(true);
    setCurrentFilm({ ...film });
    setShowModal(true);
  };
  const handleSaveFilm = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setFilms(films.map(f => f.maPhim === currentFilm.maPhim ? currentFilm : f));
    } else {
      setFilms([currentFilm, ...films]);
    }
    setShowModal(false);
  };
  const filteredFilms = films.filter(film => 
    film.tenPhim.toLowerCase().includes(searchText.toLowerCase()) ||
    film.maPhim.toString().includes(searchText)
  );









  return (
    <div className="d-flex min-vh-100 bg-light text-dark">
      <aside className="bg-dark text-white d-flex flex-column justify-content-between" style={{ width: '240px', minWidth: '240px' }}>
        <div>
          <div className="p-3 text-center opacity-25">
            <h5 className="m-0 tracking-wider">DASHBOARD</h5>
          </div>
          <ul className="nav flex-column mt-3">
            <li className="nav-item">
              <a href="#" className="nav-link active bg-primary text-white p-3 d-flex align-items-center gap-2 fw-semibold">
                <i className="bi bi-file-earmark-text"></i> Films
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-grow-1 p-4 bg-white">
        <h2 className="fw-bold mb-3">Quản lý Phim</h2>
        <button className="btn btn-outline-primary rounded-1 mb-4 px-3 py-1 small me-2" onClick={openAddModal}>Thêm phim</button>
        <button className="btn btn-outline-primary rounded-1 mb-4 px-3 py-1 small" onClick={() => navigate('/')}>Về trang chủ</button>
        <div className="input-group mb-4 shadow-sm" style={{ maxWidth: '100%' }}>
          <input type="text" className="form-control rounded-0 py-2 px-3 border-secondary border-opacity-20" placeholder="input search text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
          <button className="btn btn-primary rounded-0 px-4" type="button">
            <i className="bi bi-search"></i>
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle border-top border-light mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 px-3 border-bottom-0" style={{ width: '15%' }}>Mã phim <i className="bi bi-chevron-expand small opacity-50"></i></th>
                <th className="py-3 border-bottom-0" style={{ width: '15%' }}>Hình ảnh</th>
                <th className="py-3 border-bottom-0" style={{ width: '25%' }}>Tên phim <i className="bi bi-chevron-expand small opacity-50"></i></th>
                <th className="py-3 border-bottom-0" style={{ width: '30%' }}>Mô tả</th>
                <th className="py-3 text-center border-bottom-0" style={{ width: '15%' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredFilms.length > 0 ? (
                filteredFilms.map((film) => (
                  <tr key={film.maPhim} className="border-bottom border-light">
                    <td className="py-3 px-3 fw-medium text-secondary">{film.maPhim}</td>
                    <td className="py-3">
                      <img src={film.hinhAnh} alt={film.tenPhim} className="rounded border border-secondary border-opacity-10 object-fit-cover shadow-sm" style={{ width: '50px', height: '60px' }} onError={(e) => { e.target.src = 'https://picsum.photos/50/60'; }}/>
                    </td>
                    <td className="py-3 fw-semibold text-dark">{film.tenPhim}</td>
                    <td className="py-3 text-secondary small text-truncate" style={{ maxWidth: '280px' }}>{film.moTa}</td>
                    <td className="py-3 text-center">
                      <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-link p-0 text-primary fs-5" onClick={() => openEditModal(film)} title="Sửa">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-link p-0 text-danger fs-5" onClick={() => handleDelete(film.maPhim)} title="Xóa">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted small">Không tìm thấy phim nào khớp với từ khóa.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>






      {showModal && (
        <div className="modal show d-block backdrop-blur" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded shadow-lg text-dark bg-white">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{isEditMode ? 'Cập Nhật Thông Tin Phim' : 'Thêm Phim Mới'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSaveFilm}>
                <div className="modal-body d-flex flex-column gap-3">
                  <div>
                    <label className="form-label small fw-semibold text-secondary">Tên phim</label>
                    <input type="text" className="form-control" required value={currentFilm.tenPhim} onChange={(e) => setCurrentFilm({ ...currentFilm, tenPhim: e.target.value })}/>
                  </div>
                  <div>
                    <label className="form-label small fw-semibold text-secondary">URL hình ảnh</label>
                    <input type="text" className="form-control font-monospace small" value={currentFilm.hinhAnh} onChange={(e) => setCurrentFilm({ ...currentFilm, hinhAnh: e.target.value })}/>
                  </div>
                  <div>
                    <label className="form-label small fw-semibold text-secondary">Mô tả chi tiết</label>
                    <textarea className="form-control" rows="4" required value={currentFilm.moTa} onChange={(e) => setCurrentFilm({ ...currentFilm, moTa: e.target.value })}/>
                  </div>
                </div>
                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary btn-sm px-3 rounded-1" onClick={() => setShowModal(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary btn-sm px-3 rounded-1 fw-medium">Lưu thay đổi</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}