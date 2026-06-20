import { invoicingService } from '../services/invoicing.service.js';

import PDFDocument from 'pdfkit';

export class InvoicingController {
  async getInvoices(req, res) {
    try {
      const invoices = await invoicingService.getAllInvoices();
      res.json(invoices);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  }

  async create(req, res) {
    try {
      const { invoiceNumber, amount, status, dueDate, companyId } = req.body;
      if (!invoiceNumber) return res.status(400).json({ error: 'Invoice Number is required' });
      
      const invoice = await invoicingService.createInvoice({ 
        invoiceNumber, 
        amount: Number(amount) || 0, 
        status: status || 'Draft', 
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        companyId 
      });
      res.status(201).json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const { invoiceNumber, amount, status, dueDate, companyId } = req.body;
      const data = {};
      if (invoiceNumber !== undefined) data.invoiceNumber = invoiceNumber;
      if (amount !== undefined) data.amount = Number(amount);
      if (status !== undefined) data.status = status;
      if (dueDate !== undefined) data.dueDate = new Date(dueDate);
      if (companyId !== undefined) data.companyId = companyId;

      const invoice = await invoicingService.updateInvoice(req.params.id, data);
      res.json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      await invoicingService.deleteInvoice(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async downloadPdf(req, res) {
    try {
      const invoice = await invoicingService.getInvoiceById(req.params.id);
      if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

      const doc = new PDFDocument({ margin: 50 });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=Invoice-${invoice.invoiceNumber}.pdf`);

      doc.pipe(res);

      // Header
      doc.fontSize(20).text('INVOICE', { align: 'right' });
      doc.moveDown();
      
      // Details
      doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
      doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);
      doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`);
      doc.text(`Status: ${invoice.status}`);
      doc.moveDown();

      // Company info
      if (invoice.company) {
        doc.text('Bill To:');
        doc.text(invoice.company.name);
        if (invoice.company.website) doc.text(invoice.company.website);
        doc.moveDown();
      }

      // Amount
      doc.fontSize(14).text('Total Amount Due:', { continued: true });
      doc.fontSize(14).text(` $${invoice.amount.toLocaleString()}`, { align: 'right' });

      doc.end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const invoicingController = new InvoicingController();
