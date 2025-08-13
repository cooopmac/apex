"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const monthNames = [
  "January","February","March","April","May","June","July","August","September","October","November","December"
];

export default function MonthStatementsPage() {
  const params = useParams() as { year: string; month: string };
  const year = Number(params.year);
  const month = Number(params.month);

  const details = useQuery((api as any).statements?.listForMonth || ({} as any), { year, month } as any);
  const genUploadUrl = useMutation((api as any).statements?.generateUploadUrl || ({} as any));
  const addFile = useMutation((api as any).statements?.addFile || ({} as any));
  const upsertSheet = useMutation((api as any).statements?.upsertSheet || ({} as any));
  const copyLast = useMutation((api as any).statements?.copyLastMonth || ({} as any));

  const [files, setFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState<Record<string, number>>({});
  const [sheet, setSheet] = React.useState<string[][]>([]);
  React.useEffect(() => {
    if (details && details.sheet) setSheet(details.sheet.cells);
  }, [details]);

  function onFilesSelected(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list);
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name + f.size));
      return [...prev, ...next.filter((f) => !names.has(f.name + f.size))];
    });
  }

  function removeFileAt(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function uploadAll() {
    if (!files.length) return;
    setIsUploading(true);
    setProgress({});
    try {
      for (const f of files) {
        setProgress((p) => ({ ...p, [f.name]: 5 }));
        const { url } = await genUploadUrl({} as any);
        setProgress((p) => ({ ...p, [f.name]: 20 }));
        const res = await fetch(url, { method: "POST", headers: { "Content-Type": f.type }, body: f });
        const { storageId } = await res.json();
        setProgress((p) => ({ ...p, [f.name]: 70 }));
        await addFile({ year, month, name: f.name, storageId } as any);
        setProgress((p) => ({ ...p, [f.name]: 100 }));
      }
      setFiles([]);
    } finally {
      setIsUploading(false);
    }
  }

  async function saveSheet() {
    await upsertSheet({ year, month, cells: sheet } as any);
  }

  async function copyFromLast() {
    const d = new Date(year, month - 2, 1); // previous month
    await copyLast({ fromYear: d.getFullYear(), fromMonth: d.getMonth() + 1, toYear: year, toMonth: month } as any);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{monthNames[month - 1]} {year}</h1>
          <p className="text-muted-foreground">Upload work orders and edit the monthly statement sheet.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={copyFromLast}>Copy last month</Button>
          <Button onClick={saveSheet}>Save sheet</Button>
        </div>
      </div>
      <Separator />

      {/* Files */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium">Work orders</h2>
        <ElegantUploader
          files={files}
          isUploading={isUploading}
          progress={progress}
          onFiles={(list) => onFilesSelected(list)}
          onRemove={(idx) => removeFileAt(idx)}
          onUpload={uploadAll}
        />
        {details === undefined ? (
          <div>Loading files…</div>
        ) : details.files.length === 0 ? (
          <div className="text-muted-foreground text-sm">No files uploaded yet.</div>
        ) : (
          <ul className="list-disc pl-5 text-sm">
            {details.files.map((f: any) => (
              <li key={f._id}>
                <a href={f.url} target="_blank" className="text-primary underline">{f.name}</a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Sheet */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium">{monthNames[month - 1]} Statement</h2>
        <SheetEditor value={sheet} onChange={setSheet} />
      </section>
    </div>
  );
}

function ElegantUploader({
  files,
  isUploading,
  progress,
  onFiles,
  onRemove,
  onUpload,
}: {
  files: File[];
  isUploading: boolean;
  progress: Record<string, number>;
  onFiles: (list: FileList | null) => void;
  onRemove: (idx: number) => void;
  onUpload: () => Promise<void>;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    onFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-2">
      <div
        className={`rounded-lg border-2 border-dashed p-6 text-center cursor-pointer ${isDragging ? "border-primary bg-muted/50" : "border-muted"}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="text-sm">
          <div className="font-medium">Drag and drop files here</div>
          <div className="text-muted-foreground">or click to browse</div>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="rounded border p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">{files.length} file(s) selected</div>
            <Button size="sm" onClick={onUpload} disabled={isUploading}>
              {isUploading ? "Uploading…" : "Upload"}
            </Button>
          </div>
          <ul className="space-y-2">
            {files.map((f, idx) => (
              <li key={f.name + idx} className="flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</div>
                  {progress[f.name] !== undefined && (
                    <div className="mt-1 h-1.5 w-full bg-muted rounded">
                      <div className="h-1.5 bg-primary rounded" style={{ width: `${progress[f.name]}%` }} />
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={() => onRemove(idx)} disabled={isUploading}>Remove</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SheetEditor({ value, onChange }: { value: string[][]; onChange: (v: string[][]) => void }) {
  const rows = value.length || 15;
  const cols = value[0]?.length || 6;
  const data = React.useMemo(() => {
    const r: string[][] = [];
    for (let i = 0; i < Math.max(rows, 15); i++) {
      const row: string[] = [];
      for (let j = 0; j < Math.max(cols, 6); j++) {
        row.push(value[i]?.[j] ?? "");
      }
      r.push(row);
    }
    return r;
  }, [rows, cols, value]);

  function setCell(i: number, j: number, v: string) {
    const next = data.map((row) => row.slice());
    next[i][j] = v;
    onChange(next);
  }

  return (
    <div className="overflow-auto border rounded">
      <table className="min-w-[600px] text-sm">
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="border-r">
                  <Input
                    value={cell}
                    onChange={(e) => setCell(i, j, e.target.value)}
                    className="rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


