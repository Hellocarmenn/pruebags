import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tu-dialog',
  templateUrl: './tu-dialog.component.html',
  styleUrls: ['./tu-dialog.component.css']
})
export class TuDialogComponent implements OnInit {


  freshnessList = ["Brand New", "Second Han", "Refurbished"];
  productForm !: FormGroup;
  actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<TuDialogComponent>) { }


  ngOnInit(): void {
  

    this.productForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      etapa: ['', Validators.required],
      inicio: ['', Validators.required],
      final: ['', Validators.required],
    });

   

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['titulo'].setValue(this.editData.titulo);
      this.productForm.controls['descripcion'].setValue(this.editData.descripcion);
      this.productForm.controls['etapa'].setValue(this.editData.etapa);
      this.productForm.controls['inicio'].setValue(this.editData.inicio);
      this.productForm.controls['final'].setValue(this.editData.inicio);

    }
  }


  addProduct() {
    this.actionBtn = "Save";
    console.log(this.editData )
    if (Object.keys(this.editData).length===0) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.productForm.reset();
              this.dialogRef.close('save');
              alert("Producto Agregado");
            },
            error: () => {
              alert("Error mientras se agregaba el producto")
            }
          })
      }
    } else {
      this.updateProduct()
    }
  }
  

  updateProduct() {
    this.actionBtn = "Update";
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Product updated Successfully")
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the record");
        }
      })

  }
}
