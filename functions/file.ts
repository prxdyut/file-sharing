export const handleFileSelect = (type: string, callback: Function, successCallback: Function) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = type;
  input.addEventListener("change", (event) => {
    callback();

    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];

    successCallback(file)
  });

  input.click();
};

export function removeFileExtension(fileName: string) {
  return fileName.replace(/\.[^/.]+$/, "");
}

export function getFileExtension(filename: string) {
  var parts = filename.split(".");
  return parts[parts.length - 1];
}

export function getFileTypeByExtension(filename: string) {
  const extension = (filename.split(".").pop() as string).toLowerCase();

  const extensionMappings: any = {
    jpg: "Image",
    jpeg: "Image",
    png: "Image",
    gif: "Image",
    bmp: "Image",
    svg: "Image",
    webp: "Image",
    pdf: "PDF",
    doc: "Document",
    docx: "Document",
    txt: "Text",
    csv: "CSV",
    xls: "Excel",
    xlsx: "Excel",
    ppt: "PowerPoint",
    pptx: "PowerPoint",
    mp3: "Audio",
    wav: "Audio",
    ogg: "Audio",
    mp4: "Video",
    avi: "Video",
    mkv: "Video",
    zip: "Archive",
    rar: "Archive",
    tar: "Archive",
    gz: "Archive",
    "7z": "Archive",
    exe: "Executable",
    dll: "Executable",
    bat: "Executable",
    msi: "Executable",
  };

  const fileType = extensionMappings[extension] || "Unknown";

  return fileType;
}

export function getFileSize(FileSize: number) {
  if (FileSize) {
    const fileSizeInBytes = FileSize;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;

    if (fileSizeInKB < 1) return fileSizeInBytes.toFixed(2) + " B";
    if (fileSizeInMB < 1) return fileSizeInKB.toFixed(2) + " KB";
    return fileSizeInMB.toFixed(2) + " MB";
  }
}

export function downloadFile(url: string, fileName: string) {
  // Create an anchor element
  var a = document.createElement('a');
  a.href = url;
  a.download = fileName;

  // Append the anchor element to the body
  document.body.appendChild(a);

  // Trigger a click event on the anchor element
  a.click();

  // Cleanup: Remove the anchor element from the body
  document.body.removeChild(a);
}