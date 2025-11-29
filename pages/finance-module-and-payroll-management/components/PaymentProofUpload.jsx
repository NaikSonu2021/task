import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentProofUpload = ({ employee, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (validTypes?.includes(file?.type)) {
      setSelectedFile(file);
    } else {
      alert('Please upload only JPG, PNG or PDF files');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    setTimeout(() => {
      onUpload(employee?.id, selectedFile);
      setUploading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Upload Payment Proof</h2>
            <p className="text-sm text-muted-foreground mt-1">{employee?.name} - {employee?.employeeId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Net Salary</p>
                <p className="text-lg font-semibold text-foreground">₹{employee?.netPay?.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Payment Date</p>
                <p className="text-lg font-semibold text-foreground">{employee?.paymentDate}</p>
              </div>
            </div>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,application/pdf"
              onChange={handleChange}
            />
            
            {!selectedFile ? (
              <>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Upload" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Drag files here or upload</h3>
                <p className="text-sm text-muted-foreground mb-4">JPG, PNG or PDF (Max 5MB)</p>
                <label htmlFor="file-upload">
                  <Button variant="default" size="default" iconName="FolderOpen" iconPosition="left" asChild>
                    <span className="cursor-pointer">Choose File</span>
                  </Button>
                </label>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="FileCheck" size={32} className="text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{selectedFile?.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Size: {(selectedFile?.size / 1024)?.toFixed(2)} KB
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => setSelectedFile(null)}
                >
                  Remove
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 mt-6">
            <Button
              variant="outline"
              size="default"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="default"
              iconName="Upload"
              iconPosition="left"
              onClick={handleUpload}
              disabled={!selectedFile}
              loading={uploading}
              fullWidth
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProofUpload;