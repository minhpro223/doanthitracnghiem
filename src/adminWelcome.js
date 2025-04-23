{currentPage === "adminWelcome" && currentUser?.role === "admin" && (
    <div style={{ padding: 30 }}>
      <h2>🎉 Chào mừng Admin {currentUser.username}!</h2>
      <p>Chúc bạn một ngày làm việc hiệu quả 🎯</p>
      <img
        src="/images/admin-welcome.png"
        alt="Chào mừng Admin"
        style={{ maxWidth: "100%", marginTop: 20 }}
      />
      <div style={{ marginTop: 30 }}>
        <button
          className="submit-button"
          onClick={() => setCurrentPage("createExam")}
        >
          ✏️ Tạo đề thi ngay
        </button>
      </div>
    </div>
  )}
  