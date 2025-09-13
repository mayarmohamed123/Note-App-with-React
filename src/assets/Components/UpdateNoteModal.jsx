import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { updateNoteApi } from "../../Services/notesServices";

export default function UpdateNoteModal({
  isOpen,
  onOpenChange,
  note,
  getNotes,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: note?.title || "",
    content: note?.content || "",
  });

  // Sync when note changes
  useEffect(() => {
    if (note) {
      setFormData({ title: note.title, content: note.content });
    }
  }, [note]);

  async function handleUpdate() {
    try {
      setIsLoading(true);
      const response = await updateNoteApi(note._id, formData);
      if (response.msg === "done") {
        await getNotes();
        onOpenChange();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Edit Note</ModalHeader>
        <ModalBody className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Textarea
            label="Content"
            rows={6}
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            className="bg-green-600 text-white"
            onPress={handleUpdate}>
            Update
          </Button>
          <Button variant="light" onPress={onOpenChange}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
