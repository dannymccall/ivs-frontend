import React from "react";
import Swal from "sweetalert2";

export async function showMessage(
  greeting,
  message,
  icon,
  confirmButtonText,
  showCancelButton,
  cancelButtonColor,
  cb
) {
  const result = await Swal.fire({
    title: greeting,
    text: message,
    icon: icon,
    confirmButtonText: confirmButtonText,
    showCancelButton: showCancelButton,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: cancelButtonColor,
    animation: true,
  });

  if (result.isConfirmed) {
    cb();
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire("Cancelled", "Your content is safe", "error");
  }
}
