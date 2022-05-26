class FileLoader {
  save(blob, filename) {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  saveString(text, filename) {
    this.save(new Blob([text], { type: 'text/plain' }), filename);
  }
}

export default new FileLoader();
