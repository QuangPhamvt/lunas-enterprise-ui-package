'use client';
import { useCallback, useEffect } from 'react';

import { Image, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { useControllableState } from '@customafk/react-toolkit/hooks/useControllableState';
import { cn, formatBytes } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AudioFileIcon,
  CsvFileIcon,
  ExcelFileIcon,
  type FileIconProps,
  PdfFileIcon,
  UnknownFileIcon,
  VideoFileIcon,
  WordFileIcon,
  ZipFileIcon,
} from '@/components/features/file-icons';

import Dropzone, { type DropzoneProps, type FileRejection } from 'react-dropzone';

/**
 * Props for the FileUploader component.
 *
 * @example
 * ```tsx
 * import { FileUploader } from '@customafk/lunas-ui/ui/file-uploader';
 *
 * <FileUploader
 *   accept={{ 'image/*': [] }}
 *   maxSize={1024 * 1024 * 5}
 *   maxFileCount={3}
 *   multiple
 *   onUpload={async (files) => { await uploadFiles(files); }}
 * />
 * ```
 */
interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[];

  /**
   * Function to be called when the value changes.
   * @type (files: File[]) => void
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: (files: File[]) => void;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps['accept'];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps['maxSize'];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFileCount={4}
   */
  maxFileCount?: DropzoneProps['maxFiles'];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;

  /**
   * Whether to show the instructional drag-and-drop text inside the drop zone.
   * @default true
   */
  showText?: boolean;
  /** Size in pixels for the upload icon. */
  iconSize?: number;
}

/**
 * A drag-and-drop file upload zone that manages file selection, validation, preview generation, and optional async upload with progress tracking.
 */
export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = {
      'image/*': [],
    },
    maxSize = 1024 * 1024 * 2,
    maxFileCount = 1,
    multiple = false,
    disabled = false,
    showText = true,
    iconSize,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
        toast.error('Cannot upload more than 1 file at a time');

        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFileCount) {
        toast.error(`Cannot upload more than ${maxFileCount} files`);
        return;
      }

      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(`File ${file.name} was rejected`);
        });
      }

      if (onUpload && updatedFiles.length > 0 && updatedFiles.length <= maxFileCount) {
        const target = updatedFiles.length > 0 ? `${updatedFiles.length} files` : `file`;

        onUpload(updatedFiles).then(() => {
          setFiles([]);
          toast(`${target} uploaded`);
        });
      }
    },

    [files, maxFileCount, multiple, onUpload, setFiles]
  );

  function onRemove(index: number) {
    if (!files) return;

    if (isFileWithPreview(files[index])) {
      URL.revokeObjectURL(files[index].preview);
    }

    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to run this effect on unmount, so we don't need to include any dependencies.
  useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach(file => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount;

  return (
    <div className="relative flex w-full flex-col gap-6">
      <Dropzone onDrop={onDrop} accept={accept} maxSize={maxSize} maxFiles={maxFileCount} multiple={maxFileCount > 1 || multiple} disabled={isDisabled}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              'group',
              'border-border-weak',
              'hover:bg-border-weak/20',
              'relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition',
              'ring-offset-background',
              'focus-visible:ring-primary-weak',
              'focus-visible:ring-2',
              'focus-visible:ring-offset-2',
              'focus-visible:outline-hidden',
              isDragActive && 'border-border-primary-strong bg-border-weak/40',
              isDisabled && 'pointer-events-none opacity-60',
              className
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <Upload className="size-7 text-text-positive-muted" aria-hidden="true" />
                </div>
                <p className="font-medium text-text-positive-muted">Drop the files here</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <Upload size={iconSize || 24} className="text-muted-foreground" aria-hidden="true" />
                </div>
                {!!showText && (
                  <div className="flex flex-col gap-px">
                    <p className="font-medium text-text-positive-weak text-xs">Drag {`'n'`} drop files here, or click to select files</p>
                    <p className="text-text-positive-muted text-xs">
                      You can upload
                      {maxFileCount > 1
                        ? ` ${maxFileCount === Infinity ? 'multiple' : maxFileCount}
                      files (up to ${formatBytes(maxSize)} each)`
                        : ` a file with ${formatBytes(maxSize)}`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {files?.length ? (
        <div className="h-fit w-full overflow-y-auto">
          <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-1 text-text-positive-weak">
              <Image size={16} aria-hidden="true" />
              <p className="text-sm">Ảnh đã tải lên ({files.length})</p>
            </div>
            <button
              className="flex cursor-pointer items-center gap-1 text-text-positive-muted transition-colors duration-200 hover:text-text-positive"
              onClick={() => {
                if (!files) return;
                files.forEach(file => {
                  if (!isFileWithPreview(file)) return;
                  URL.revokeObjectURL(file.preview);
                });
                setFiles([]);
                onValueChange?.([]);
              }}
            >
              <Trash2 size={16} aria-hidden="true" />
              <p className="text-sm">Xóa tất cả</p>
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {files?.map((file, index) => (
              <FileCard key={`${index.toString()}`} file={file} onRemove={() => onRemove(index)} progress={progresses?.[file.name]} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
  return (
    <div className="relative flex items-center gap-4 rounded border border-border-weak py-2 pr-3 pl-2 shadow-xs transition-colors hover:border-border">
      <div className="flex flex-1 gap-2.5">
        {isFileWithPreview(file) ? <FilePreview file={file} /> : null}
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-y-0.5">
            <p className="line-clamp-1 text-sm text-text-positive">{file.name}</p>
            <p className="text-text-positive-muted text-xs">{formatBytes(file.size)}</p>
          </div>
          {progress ? <Progress value={progress} /> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="ghost" color="danger" size="icon" className="size-7" onClick={onRemove}>
          <Trash2 size={16} aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return 'preview' in file && typeof file.preview === 'string';
}

interface FilePreviewProps {
  file: File & { preview: string };
}

const MIME_TYPE_ICON_MAP: Record<string, React.FC<FileIconProps>> = {
  'application/pdf': PdfFileIcon,
  'text/csv': CsvFileIcon,
  'application/msword': WordFileIcon,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': WordFileIcon,
  'application/vnd.ms-excel': ExcelFileIcon,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ExcelFileIcon,
  'application/zip': ZipFileIcon,
  'application/x-zip-compressed': ZipFileIcon,
};

function FilePreview({ file }: FilePreviewProps) {
  if (file.type.startsWith('image/')) {
    return <img src={file.preview} className="aspect-square size-10 shrink-0 rounded border border-border object-cover object-top shadow-sm" />;
  }

  if (file.type.startsWith('audio/')) {
    return <AudioFileIcon size={40} className="size-10 shrink-0" aria-hidden="true" />;
  }

  if (file.type.startsWith('video/')) {
    return <VideoFileIcon size={40} className="size-10 shrink-0" aria-hidden="true" />;
  }

  const Icon = MIME_TYPE_ICON_MAP[file.type] ?? UnknownFileIcon;

  return <Icon size={40} className="size-10 shrink-0" aria-hidden="true" />;
}
