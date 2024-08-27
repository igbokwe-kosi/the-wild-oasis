import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, data: stays } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
    // staleTime: 1000 * 60 * 5,
  });

  return { isLoading, stays };
}
