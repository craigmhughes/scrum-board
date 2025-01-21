type Entry = {
    type: string,
    name: string,
}

export type FileEntry = Entry & {
    added: string
}

export type Folder = Entry & {
    files: FileEntry[],
}

export type FileData = (FileEntry | Folder)[];