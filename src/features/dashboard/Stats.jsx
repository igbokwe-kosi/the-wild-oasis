import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const totalBookings = bookings.length;
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const checkIns = confirmedStays.length;
  const occupancyRate =
    confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title={"bookings"}
        value={totalBookings}
        color={"blue"}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title={"Sales"}
        value={formatCurrency(sales)}
        color={"green"}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title={"Check-ins"}
        value={checkIns}
        color={"indigo"}
      />
      <Stat
        icon={<HiOutlinePresentationChartLine />}
        title={"Occupancy Rate"}
        value={`${Math.round(occupancyRate * 100)}%`}
        color={"yellow"}
      />
    </>
  );
}

export default Stats;
