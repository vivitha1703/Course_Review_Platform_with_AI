export default function getDashboardPath() {
  const user = JSON.parse(localStorage.getItem("user"));

  switch (user?.role) {
    case "student":
      return "/student-dashboard";
    case "instructor":
      return "/instructor-dashboard";
    case "admin":
      return "/admin-dashboard";
    default:
      return "/";
  }
}