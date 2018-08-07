module testbench;
    logic [3:0] a, b, result, answer;
    logic [4:0] result5;
    logic carry;
    int i, j;
    
    adder_nbit adder(a, b, result, carry);
    assign answer = a + b;
    assign result5 = {carry, result};
    
    initial begin
       $monitor("%04b+%04b -> %05b (%d+%d=%d)", a, b, result5, a, b, result5);
       for (i = 0; i <= 15; i++) begin
        for (j = 0; j <= 15; j++) begin
            a = i; b = j;
            #1;
            if (result != answer) $display("wrong answer!");
        end
       end
       $finish;
    end
endmodule

module FA (
    input A, B, Cin,
    output S, Cout
);
    assign S = (A ^ B) ^ Cin;
    assign Cout = ((A ^ B) & Cin) | (A & B);
endmodule

module adder_nbit #(parameter SIZE = 4) (
    input [SIZE-1:0] A, B,
    output [SIZE-1:0] S,
    output C
);
    logic [SIZE-2:0] carry;
    
    FA fa0(A[0], B[0], 1'b0, S[0], carry[0]);
    genvar i;
    generate
    for (i = 1; i < SIZE - 1; i = i + 1) begin: GenerateAdder
        FA fa(A[i], B[i], carry[i-1], S[i], carry[i]);
    end
    endgenerate
    FA fa_msb(A[SIZE-1], B[SIZE-1], carry[SIZE-2], S[SIZE-1], C);
endmodule