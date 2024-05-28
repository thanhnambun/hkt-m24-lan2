import Alert from "react-bootstrap/Alert";

type Props = {
  addSuccess: boolean;
  updateSuccess: boolean;
};
export default function Modal(props: Props) {
  const { addSuccess } = props;
  const { updateSuccess } = props;
  return (
    <div>
      {addSuccess ? (
        <Alert key={"success"} variant={"success"}>
          Thêm vào giỏ hàng thành công
        </Alert>
      ) : (
        ""
      )}
      {updateSuccess ? (
        <Alert key={"warning"} variant={"warning"}>
          Sửa thành công
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
}
