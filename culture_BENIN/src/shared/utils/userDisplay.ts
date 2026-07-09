interface NamedUser {
  firstname: string;
  lastname: string;
}

export function getFullName(user: NamedUser): string {
  return `${user.firstname} ${user.lastname}`.trim();
}

export function getInitials(user: NamedUser): string {
  const first = user.firstname.charAt(0);
  const last = user.lastname.charAt(0);
  return `${first}${last}`.toUpperCase();
}
