import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { authState } from '../recoil/authAtom';
import LoggedInLayout from "../components/LoggedInLayout";
import { Pencil, Eye, EyeOff } from "lucide-react";

const Settings = () => {
  const { user, token } = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);

  const [editable, setEditable] = useState(false);

  const [formData, setFormData] = useState({
    fullName: `${user?.firstName || ''} ${user?.lastName || ''}`,
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
        setEditable(false);

        const [firstName, lastName] = formData.fullName.split(" ");
        const updatedUser = {
          ...user,
          firstName,
          lastName,
          email: formData.email,
          phone: formData.phone,
        };

        setAuth((prev) => ({
          ...prev,
          user: updatedUser,
        }));
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("Please fill all password fields.");
    }

    if (newPassword !== confirmPassword) {
      return alert("New password and confirm password do not match.");
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Password changed successfully!");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        alert(data.message || "Password change failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error changing password.");
    }
  };

  return (
    <LoggedInLayout>
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen p-6 md:p-10 rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>

        {/* Profile Section */}
        <div className="bg-gradient-to-br from-violet-100 via-white to-pink-100 rounded-xl p-6 shadow-lg mb-10 relative border border-violet-200">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6 flex items-center justify-between">
            Profile Information
            <button
              onClick={() => setEditable(true)}
              className="text-indigo-600 hover:text-indigo-800"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!editable}
              className={`p-3 border rounded-md ${editable ? "bg-white" : "bg-gray-100"}`}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editable}
              className={`p-3 border rounded-md ${editable ? "bg-white" : "bg-gray-100"}`}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editable}
              className={`p-3 border rounded-md ${editable ? "bg-white" : "bg-gray-100"}`}
            />
            {editable && (
              <button
                type="button"
                onClick={handleSave}
                className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>

        {/* Password Change Section */}
        <div className="bg-gradient-to-br from-violet-100 via-white to-pink-100 rounded-xl p-6 shadow-lg border border-violet-200">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field} className="relative">
                <input
                  type={showPasswords[field.split("Password")[0]] ? "text" : "password"}
                  name={field}
                  placeholder={
                    field === "currentPassword"
                      ? "Current Password"
                      : field === "newPassword"
                      ? "New Password"
                      : "Confirm New Password"
                  }
                  value={passwords[field]}
                  onChange={handlePasswordChange}
                  className="p-3 border rounded-md w-full"
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility(field.split("Password")[0])}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPasswords[field.split("Password")[0]] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleChangePassword}
              className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
};

export default Settings;
