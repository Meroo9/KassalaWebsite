"use client";

import React, { createContext, useContext, useState } from "react";

const UserRoleContext = createContext();

export const ROLES = {
  ALL: "all",
  NEW_STUDENT: "new_student",
  CURRENT_STUDENT: "current_student",
  FACULTY: "faculty",
};

export function UserRoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    if (typeof window === "undefined") return ROLES.ALL;
    const savedRole = window.localStorage.getItem("kassala_user_role");
    return savedRole && Object.values(ROLES).includes(savedRole) ? savedRole : ROLES.ALL;
  });

  const changeRole = (newRole) => {
    if (Object.values(ROLES).includes(newRole)) {
      setRole(newRole);
      window.localStorage.setItem("kassala_user_role", newRole);
    }
  };

  return (
    <UserRoleContext.Provider value={{ role, changeRole, ROLES }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
}
