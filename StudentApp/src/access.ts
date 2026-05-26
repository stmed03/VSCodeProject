export default function access(initialState: { currentUser?: { userName?: string } }) {
  return {
    canAccessStudents: !!initialState?.currentUser,
  };
}