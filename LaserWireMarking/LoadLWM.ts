class LoadLWM extends LoadContentBlock {
    pieceIndex: number = 0;
    constructor() {
        super();
    }

    Init() {
        this.LoadSection("laserwiremarkingform", "contact-information");
    }

    AddPiece() {
        if ($("#laser-wire-marking-options-form").valid()) {
            $('#piece_table').show();
            this.pieceIndex++;
            this.postData.Pieces.push({ id: this.pieceIndex, partNumber: $('#PartNumber').val(), textGap: $('#TextGap').val(), textLength: $('#TextLength').val(), wireText: $('#WireText').val() });

            var record =
                "<tr>" +
                `<td style="display:none">${this.pieceIndex}</td>` +
                "<td>" + $('#WireText').val() + "</td>" + "<td>" + $('#TextLength').val() + " in.</td>" + "<td>" + $('#TextGap').val() + " in.</td>" + "<td>" + $('#PartNumber').val() + "</td>" +
                `<td><button onclick="load_lwm.RemoveRow(this, ${this.pieceIndex})" ` +
                "class='btn btn-icon hide-label'><span class='edmo-icon edmo-icon-close undefined'><svg aria-hidden='false' focusable='false' data-prefix='fal' data-icon='times' class='svg-inline--fa fa-times fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' aria-label='Remove'><path fill='currentColor' d='M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z'></path></svg></span><span class='btn-label'>Remove Piece</span></button></td>" +
                "</tr>";

            $('#piece_body').append(record);

            $('#WireText').val('');
            $('#TextLength').val('10');
            $('#TextGap').val('1');
            $('#PartNumber').val('');
        }
    }
}