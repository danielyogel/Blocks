import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export function SortableItem(props: { children: React.ReactNode; id: string; disabled: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id, disabled: props.disabled });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...(transition && { transition }),
        ...(isDragging && { zIndex: 1 }),
        transform: CSS.Transform.toString(transform),

        pointerEvents: transform?.x || transform?.y ? 'none' : 'auto' // IMPORTANT: when dragging disable all inner node's events !
      }}
    >
      <div className=''>{props.children}</div>
    </div>
  );
}
