'use client';

/**
 * @module @customafk/lunas-ui/features/file-icons
 *
 * Colored 28×28 file-type and service icons. Every icon is decorative (`aria-hidden`) by default,
 * accepts any SVG prop plus a square `size`, and lives in its own module so unused icons tree-shake.
 *
 * @example
 * ```tsx
 * import { PdfFileIcon, WordFileIcon } from '@customafk/lunas-ui/features/file-icons';
 *
 * <PdfFileIcon size={20} />
 * <WordFileIcon aria-hidden={false} aria-label="Tài liệu Word" />
 * ```
 */
export { AudioFileIcon } from './icons/audio-file-icon';
export { CsvFileIcon } from './icons/csv-file-icon';
export { Ebl1Icon } from './icons/ebl1-icon';
export { Ebl2Icon } from './icons/ebl2-icon';
export { Ebl3Icon } from './icons/ebl3-icon';
export { EblIcon } from './icons/ebl-icon';
export { ExcelFileIcon } from './icons/excel-file-icon';
export { ExternalLinkFileIcon } from './icons/external-link-file-icon';
export { FileAddIcon } from './icons/file-add-icon';
export { GenericFileIcon } from './icons/generic-file-icon';
export { GithubFileIcon } from './icons/github-file-icon';
export { GoogleDocsIcon } from './icons/google-docs-icon';
export { GoogleDriveIcon } from './icons/google-drive-icon';
export { GoogleFormsIcon } from './icons/google-forms-icon';
export { GoogleSheetsIcon } from './icons/google-sheets-icon';
export { GoogleSitesIcon } from './icons/google-sites-icon';
export { GoogleSlidesIcon } from './icons/google-slides-icon';
export { ImageFileIcon } from './icons/image-file-icon';
export { PdfFileIcon } from './icons/pdf-file-icon';
export { PptFileIcon } from './icons/ppt-file-icon';
export { UnknownFileIcon } from './icons/unknown-file-icon';
export { VideoFileIcon } from './icons/video-file-icon';
export { VimeoFileIcon } from './icons/vimeo-file-icon';
export { WordFileIcon } from './icons/word-file-icon';
export { YoutubeFileIcon } from './icons/youtube-file-icon';
export { ZipFileIcon } from './icons/zip-file-icon';
export type { FileIconProps } from './types';
