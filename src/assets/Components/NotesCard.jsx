import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Edit2, Trash2 } from "lucide-react";
import UpdateNoteModal from "./UpdateNoteModal";
import DeleteNoteModal from "./DeleteNoteModal";

export default function NotesCard({ notes = [], getNotes }) {
  // Update modal state
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onOpenChange: onUpdateChange,
  } = useDisclosure();
  const [selectedNote, setSelectedNote] = useState(null);

  // Delete modal state
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteChange,
  } = useDisclosure();
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  return (
    <div>
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10">
          {notes.map((note) => (
            <Card
              key={note._id}
              className="note-card border-0 group shadow-md hover:shadow-lg transition">
              <CardHeader className="flex justify-between items-start pb-2">
                <h3 className="font-semibold text-lg line-clamp-2 text-green-900">
                  {note.title}
                </h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => {
                      setSelectedNote(note);
                      onUpdateOpen();
                    }}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => {
                      setDeleteNoteId(note._id);
                      onDeleteOpen();
                    }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-gray-600 line-clamp-4">
                  {note.content || "No content"}
                </p>
              </CardBody>
              <CardFooter className="text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleDateString()}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No notes yet. Create your first one!</p>
        </div>
      )}

      {/* External Modals */}
      {selectedNote && (
        <UpdateNoteModal
          isOpen={isUpdateOpen}
          onOpenChange={onUpdateChange}
          note={selectedNote}
          getNotes={getNotes}
        />
      )}

      {deleteNoteId && (
        <DeleteNoteModal
          isOpen={isDeleteOpen}
          onOpenChange={onDeleteChange}
          noteId={deleteNoteId}
          getNotes={getNotes}
        />
      )}
    </div>
  );
}
