import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { deleteNoteApi } from "../../Services/notesServices";

export default function DeleteNoteModal({
  isOpen,
  onOpenChange,
  noteId,
  getNotes,
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      const response = await deleteNoteApi(noteId);
      if (response.msg === "done") {
        await onOpenChange();
        await getNotes();
      } else {
        console.log(response);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          <p className="text-gray-700">
            Are you sure you want to delete this note? This action cannot be
            undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button isLoading={isLoading} color="danger" onPress={handleDelete}>
            Delete
          </Button>
          <Button variant="light" onPress={onOpenChange}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
