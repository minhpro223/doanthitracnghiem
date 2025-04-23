import React, { useState, useEffect } from "react";
import QuizApp from "./QuizApp";
import CreateExamForm from "./CreateExamForm";
import CreateForm from "./CreateForm";
import CreateExamRoom from "./CreateExamRoom";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [examConfig, setExamConfig] = useState(() => {
    const saved = localStorage.getItem("examConfig");
    return saved ? JSON.parse(saved) : null;
  });

  const mockStudentInfo = {
    studentName: "Nguyễn Văn A",
    studentId: "123456",
    roomName: "Phòng A",
    examCode: "EX123",
  };

  const mockExamConfig = {
    examCodes: [
      {
        id: "EX123",
        questions: [
          { questionText: "Câu 1: 2 + 2 = ?", correctAnswer: 1 },
          { questionText: "Câu 2: Trái đất là hình gì?", correctAnswer: 2 },
        ],
      },
    ],
  };

  const mockStudentAnswers = [1, 2];
  const [studentInfo, setStudentInfo] = useState(null);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const todayItems = [
    {
      title: "Bài kiểm tra",
      desc: "Ôn tập các kiến thức mới.",
      date: "2025-04-23",
    },
    {
      title: "Thông báo",
      desc: "Hệ thống đang được cập nhật",
      date: "2025-04-23",
    },
  ];

  const orgItems = [
    {
      title: "Thông báo nghỉ lễ",
      image: "/images/banner2.jpg",
      date: "2025-04-22",
    },
    {
      title: "Chúc mừng học sinh và giáo viên nhân dịp 30/4 và 1/5",
      image: "/images/lich-nghi-le-304-15-2.jpg",
      date: "2025-04-21",
    },
  ];

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password, remember } = loginFormData;

    if (username === "admin" && password === "1") {
      const admin = { username: "admin", password: "1", role: "admin" };
      setCurrentUser(admin);
      setLoginError("");
      setShowLogin(false);
      setCurrentPage("adminWelcome");
      if (remember) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      setCurrentUser(storedUser);
      setLoginError("");
      setShowLogin(false);
      setCurrentPage("home");
      if (remember) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    } else {
      setLoginError("❌ Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      role: "user",
    };

    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.username === newUser.username) {
      alert("❌ Tên người dùng đã tồn tại.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(newUser));
    alert("✅ Đăng ký thành công!");
    setShowRegister(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
  };

  const handleCreateQuiz = () => {
    if (!currentUser) return setShowLogin(true);
    if (currentUser.role !== "admin") {
      return alert("⚠️ Bạn phải là giáo viên để tạo đề thi.");
    }
    setCurrentPage("createExam");
  };

  const handleCreateRoom = () => {
    if (!currentUser) return setShowLogin(true);
    setCurrentPage("createRoom");
  };

  const handleItemClick = (item) => {
    alert(`📌 Bạn vừa chọn: ${item.title}`);
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      setLoginFormData((prev) => ({
        ...prev,
        username: savedUsername,
        password: savedPassword,
        remember: true,
      }));
    }
  }, []);

  const renderAdminWelcome = () => (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h2>🎉 Chào mừng Admin {currentUser.username}!</h2>
      <p>Chúc bạn một ngày làm việc hiệu quả 🎯</p>
      <img
        src="/images/admin-welcome.png"
        alt="Chào mừng Admin"
        style={{ maxWidth: "100%", maxHeight: "300px", marginTop: 20 }}
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
  );

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <h2>NHÓM 21_ THỨ 6</h2>
        </div>
        <div className="navbar-right">
          <button className="nav-button" onClick={() => setCurrentPage("home")}>
            Trang chủ
          </button>
          {!currentUser ? (
            <>
              <button className="nav-button" onClick={toggleLogin}>
                Đăng nhập
              </button>
              <button className="nav-button" onClick={toggleRegister}>
                Đăng ký
              </button>
            </>
          ) : (
            <>
              <button className="nav-button" onClick={handleLogout}>
                Đăng xuất
              </button>
              {currentUser.role === "user" && (
                <>
                  <button
                    className="nav-button"
                    onClick={() => {
                      setStudentInfo(mockStudentInfo);
                      setExamConfig(mockExamConfig);
                      setStudentAnswers(mockStudentAnswers);
                      setCurrentPage("result");
                    }}
                  >
                    Xem kết quả
                  </button>
                  <button className="nav-button" onClick={handleCreateRoom}>
                    Thi
                  </button>
                </>
              )}
              {currentUser.role === "admin" && (
                <button className="nav-button" onClick={handleCreateQuiz}>
                  Tạo đề thi
                </button>
              )}
              <span style={{ marginRight: 10 }}>
                👤 {currentUser.username} ({currentUser.role})
              </span>
            </>
          )}
        </div>
      </div>

      {/* Modal Login/Register */}
      {showLogin && (
        <div className="modal">
          <div className="form-box">
            <button className="close-btn" onClick={() => setShowLogin(false)}>
              &times;
            </button>
            <h3>Đăng nhập</h3>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                value={loginFormData.username}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={loginFormData.password}
                onChange={handleLoginChange}
                required
              />
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  checked={loginFormData.remember}
                  onChange={handleLoginChange}
                />
                Lưu mật khẩu
              </label>
              {loginError && <p style={{ color: "red" }}>{loginError}</p>}
              <button type="submit" className="submit-button">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <div className="form-box">
            <button
              className="close-btn"
              onClick={() => setShowRegister(false)}
            >
              &times;
            </button>
            <h3>Đăng ký</h3>
            <form onSubmit={handleRegister}>
              <input name="username" placeholder="Tên người dùng" required />
              <input name="email" type="email" placeholder="Email" required />
              <input
                name="password"
                type="password"
                placeholder="Mật khẩu"
                required
              />
              <button className="submit-button">Đăng ký</button>
            </form>
          </div>
        </div>
      )}

      {/* Trang chào mừng admin */}
      {currentPage === "adminWelcome" &&
        currentUser?.role === "admin" &&
        renderAdminWelcome()}

      {/* Trang chính home */}
      {currentPage === "home" && (
        <div style={{ padding: 20 }}>
          <div className="welcome-message">
            <img
              src="/images/Welcome to .png"
              alt="Chào mừng"
              className="welcome-image"
            />
          </div>
          <div className="dashboard-section">
            <h3>Dành cho bạn ngay hôm nay</h3>
            <div className="dashboard-row">
              {todayItems.map((item, idx) => (
                <div
                  key={idx}
                  className="dashboard-card large"
                  onClick={() => handleItemClick(item)}
                >
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                  <span className="created-date">Tạo ngày: {item.date}</span>
                </div>
              ))}
            </div>
            <h3>Thông Báo Mới Nhất</h3>
            <div className="dashboard-grid">
              {orgItems.map((item, idx) => (
                <div key={idx} className="dashboard-card">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-icon"
                    />
                  )}
                  <div className="card-content">
                    <p className="card-title">{item.title}</p>
                    <span className="created-date">Tạo ngày: {item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Các trang khác */}
      {currentPage === "createExam" && (
        <CreateExamForm
          setExamConfig={setExamConfig}
          goToCreateForm={() => setCurrentPage("createForm")}
        />
      )}
      {currentPage === "createForm" && examConfig && (
        <CreateForm
          examConfig={examConfig}
          onFinish={() => setCurrentPage("home")}
        />
      )}
      {currentPage === "createRoom" && (
        <CreateExamRoom
          examConfig={examConfig}
          setStudentInfo={setStudentInfo}
          goToQuizApp={() => setCurrentPage("quiz")}
        />
      )}
      {currentPage === "quiz" && (
        <QuizApp
          examConfig={examConfig}
          studentInfo={studentInfo}
          setStudentAnswers={setStudentAnswers}
          goToResult={() => setCurrentPage("result")}
        />
      )}
      {currentPage === "result" && studentInfo && examConfig && (
        <div style={{ padding: 20 }}>
          <h3>📋 Kết quả làm bài</h3>
          <p>
            <strong>Họ tên:</strong> {studentInfo.studentName}
          </p>
          <p>
            <strong>MSSV:</strong> {studentInfo.studentId}
          </p>
          <p>
            <strong>Phòng thi:</strong> {studentInfo.roomName}
          </p>
          <p>
            <strong>Mã đề:</strong> {studentInfo.examCode}
          </p>
          <h4>Chi tiết bài làm:</h4>
          {(() => {
            const exam = examConfig.examCodes.find(
              (e) => e.id === studentInfo.examCode
            );
            let score = 0;
            const details = exam.questions.map((q, idx) => {
              const selected = studentAnswers[idx];
              const isCorrect = q.correctAnswer === selected;
              if (isCorrect) score++;
              return (
                <div key={idx} style={{ marginBottom: 10 }}>
                  <p>
                    <strong>Câu {idx + 1}:</strong> {q.questionText}
                  </p>
                  <p>
                    ✅ Đáp án đúng: {String.fromCharCode(65 + q.correctAnswer)}
                  </p>
                  <p>
                    📝 Bạn chọn:{" "}
                    {selected !== undefined
                      ? String.fromCharCode(65 + selected)
                      : "Chưa chọn"}{" "}
                    {isCorrect ? "✅" : "❌"}
                  </p>
                  <hr />
                </div>
              );
            });
            return (
              <>
                {details}
                <p>
                  <strong>🎯 Tổng điểm:</strong> {score} /{" "}
                  {exam.questions.length}
                </p>
                <p>
                  <strong>
                    {score >= exam.questions.length / 2
                      ? "✅ Đạt"
                      : "❌ Không đạt"}
                  </strong>
                </p>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export default App;
