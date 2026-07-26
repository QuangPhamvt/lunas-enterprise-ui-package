'use client';

import {
  AudioFileIcon,
  CsvFileIcon,
  Ebl1Icon,
  Ebl2Icon,
  Ebl3Icon,
  EblIcon,
  ExcelFileIcon,
  ExternalLinkFileIcon,
  FileAddIcon,
  type FileIconProps,
  GenericFileIcon,
  GithubFileIcon,
  GoogleDocsIcon,
  GoogleDriveIcon,
  GoogleFormsIcon,
  GoogleSheetsIcon,
  GoogleSitesIcon,
  GoogleSlidesIcon,
  ImageFileIcon,
  PdfFileIcon,
  PptFileIcon,
  UnknownFileIcon,
  VideoFileIcon,
  VimeoFileIcon,
  WordFileIcon,
  YoutubeFileIcon,
  ZipFileIcon,
} from '@/components/features/file-icons';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

const ICONS: { name: string; Icon: React.FC<FileIconProps> }[] = [
  { name: 'PdfFileIcon', Icon: PdfFileIcon },
  { name: 'CsvFileIcon', Icon: CsvFileIcon },
  { name: 'WordFileIcon', Icon: WordFileIcon },
  { name: 'ExcelFileIcon', Icon: ExcelFileIcon },
  { name: 'PptFileIcon', Icon: PptFileIcon },
  { name: 'ImageFileIcon', Icon: ImageFileIcon },
  { name: 'AudioFileIcon', Icon: AudioFileIcon },
  { name: 'VideoFileIcon', Icon: VideoFileIcon },
  { name: 'ZipFileIcon', Icon: ZipFileIcon },
  { name: 'GenericFileIcon', Icon: GenericFileIcon },
  { name: 'UnknownFileIcon', Icon: UnknownFileIcon },
  { name: 'FileAddIcon', Icon: FileAddIcon },
  { name: 'ExternalLinkFileIcon', Icon: ExternalLinkFileIcon },
  { name: 'GoogleDocsIcon', Icon: GoogleDocsIcon },
  { name: 'GoogleDriveIcon', Icon: GoogleDriveIcon },
  { name: 'GoogleFormsIcon', Icon: GoogleFormsIcon },
  { name: 'GoogleSheetsIcon', Icon: GoogleSheetsIcon },
  { name: 'GoogleSitesIcon', Icon: GoogleSitesIcon },
  { name: 'GoogleSlidesIcon', Icon: GoogleSlidesIcon },
  { name: 'GithubFileIcon', Icon: GithubFileIcon },
  { name: 'VimeoFileIcon', Icon: VimeoFileIcon },
  { name: 'YoutubeFileIcon', Icon: YoutubeFileIcon },
  { name: 'EblIcon', Icon: EblIcon },
  { name: 'Ebl1Icon', Icon: Ebl1Icon },
  { name: 'Ebl2Icon', Icon: Ebl2Icon },
  { name: 'Ebl3Icon', Icon: Ebl3Icon },
];

const meta = {
  title: 'Features/File Icons',
  component: PdfFileIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof PdfFileIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6 p-4">
      {ICONS.map(({ name, Icon }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon size={28} data-testid={name} />
          <span className="text-center font-mono text-[10px] text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const { name } of ICONS) {
      await expect(canvas.getByTestId(name)).toBeInTheDocument();
    }
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-4">
      {[16, 20, 24, 28, 40, 56].map(size => (
        <PdfFileIcon key={size} size={size} />
      ))}
    </div>
  ),
};
