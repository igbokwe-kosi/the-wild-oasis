import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  // const { status, bookingID } = booking;

  if (isLoading) {
    return <Spinner />;
  }

  if (!booking) return <Empty resource={"booking"} />;

  const { status, id: bookingID } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingID}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingID}`)}>
              Check-in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => {
                checkout(bookingID);
              }}
              disabled={isCheckingOut}
            >
              Check-out
            </Button>
          )}
          <Modal.Open opens={"delete"}>
            <Button variation="danger" icon={<HiTrash />}>
              Delete
            </Button>
          </Modal.Open>
        </ButtonGroup>
        <Modal.Window name={"delete"}>
          <ConfirmDelete
            resourceName={"booking"}
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingID)}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
