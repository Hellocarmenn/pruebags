import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TuDialogComponent } from '../tu-dialog/tu-dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-icon-dialog',
  templateUrl: './icon-dialog.component.html',
  styleUrls: ['./icon-dialog.component.css']
})
export class IconDialogComponent  implements OnInit{

  displayedColumns: string[] = ['titulo', 'descripcion', 'etapa', 'inicio','final','action','eliminar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,private api : ApiService) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(TuDialogComponent, {
      width: '50%', // ajusta el ancho según tus necesidades
      data: {} // puedes pasar datos al diálogo si es necesario
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
      }

    })
  }

  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error:()=>{
        alert("Error while fetching the Records!!")
      }
    } )
  }
  
  


  editProduct(row : any){
    this.dialog.open(TuDialogComponent,{
      
      width:'30%',
      data:row
    }).afterClosed().subscribe(val =>{
      if(val === 'update'){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res) =>{
        alert("Borrado")
        this.getAllProducts();
      },
      error:() =>{
        alert("Error al borrar")
      }
    })

  }





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
