import { Badge } from "../ui/badge";

const TeamMemberCard = () => {
  const role = "admin";

  return (
    <div>
      <p className="text-xs capitalize">Brazil</p>
      <Badge variant={role}>{role}</Badge>
    </div>
  );
};

export default TeamMemberCard;
