import React, { useState } from "react";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { Search, Plus } from "lucide-react";
import { addNoteApi } from "../../Services/notesServices";

export default function NotesToolbar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCreateNote() {
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await addNoteApi({
        title: title,
        content: content,
      });

      console.log("Note created:", response);

      if (response?.msg?.includes("validation failed")) {
        setError("Both title and content are required.");
        return;
      }

      // reset fields
      setTitle("");
      setContent("");
      onOpenChange(); // close modal
    } catch (err) {
      console.error("Error creating note:", err);
      setError(
        err?.response?.data?.msg || "Failed to create note. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 m-8">
      {/* 🔍 Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400 w-4 h-4" />
        <Input placeholder="Search your notes..." className="pl-10" />
      </div>

      {/* ➕ New Note Button & Modal */}
      <Button onPress={onOpen} className="bg-green-600 text-white">
        <Plus className="w-4 h-4 mr-2" />
        New Note
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create a New Note
          </ModalHeader>
          <ModalBody>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <Input
              label="Title"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              label="Content"
              placeholder="Write your thoughts here..."
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onOpenChange} isDisabled={loading}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 text-white"
              onPress={handleCreateNote}
              isLoading={loading}>
              {loading ? "Creating..." : "Create Note"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
