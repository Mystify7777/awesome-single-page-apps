import React from "react";

const Toast = ({ message, type }) => {
  if (!message) return null;

  const typeMap = {
    success: {
      bg: "bg-success",
      icon: "bi-check-circle-fill",
    },
    danger: {
      bg: "bg-danger",
      icon: "bi-x-circle-fill",
    },
    warning: {
      bg: "bg-warning text-dark",
      icon: "bi-exclamation-triangle-fill",
    },
    info: {
      bg: "bg-info text-dark",
      icon: "bi-info-circle-fill",
    },
  };

  const current = typeMap[type] || typeMap["info"];

  return (
    <div
      className={`toast-container position-fixed top-0 start-50 translate-middle-x mt-4 px-3`}
      style={{ zIndex: 2000 }}
    >
      <div
        className={`d-flex align-items-center gap-2 px-4 py-2 shadow rounded-4 text-white ${current.bg} animate__animated animate__fadeInDown`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <i className={`bi ${current.icon} fs-5`}></i>
        <div className="fw-semibold small">{message}</div>
      </div>
    </div>
  );
};

export default Toast;