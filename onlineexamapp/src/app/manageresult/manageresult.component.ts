import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService, Result } from '../admin.service';
import { runPostSignalSetFn } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-manageresult',
  imports: [CommonModule,FormsModule],
  templateUrl: './manageresult.component.html',
  styleUrl: './manageresult.component.css'
})


// ====
export class ManageresultComponent implements OnInit {
  
  subject:any='';
  pageno: number = 1;
  results: Result[] = [];
  slicedResult: Result[] = [];
  pages: number[] = [];
  data: any = '';
    
  constructor(private adminservice: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.showResult(this.pageno);  // Initialize results when the component is loaded
  }

  showResult(pageno: number ) {
    let subject: any = this.subject;  // You can pass the subject dynamically if needed

    // Make the API call
    this.adminservice.getResults(subject).subscribe(array => {
      this.data = array;
      this.results = this.data;  // Assign fetched data to results
      this.updatePages();        // Update page numbers after fetching data
      this.updateSlicedResult(pageno);  // Update the sliced results for current page
    });
  }

  // Update the page numbers based on the total results
  updatePages() {
    const totalResults = this.results.length;
    const totalPages = Math.ceil(totalResults / 3);  //  each page has 3 items
    this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);  // Create an array of page numbers
  }

  // Update sliced result based on current page number
  updateSlicedResult(pageno: number) {
    const start: number = (pageno - 1) * 3;  // Calculate the start index
    const end: number = start + 3;            // Calculate the end index
    this.slicedResult = this.results.slice(start, end);  // Slice the results for the current page
  }

  // Function to handle page navigation
  onPageChange(pageno: number) {
    this.pageno = pageno;  // Update current page number
    this.updateSlicedResult(pageno);  // Update the results based on the new page
  }
}
