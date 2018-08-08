/**
 * 3bit加算器
 * FA ... 1桁全加算器
 * HA ... 1桁半加算器
 * adder4 ... 4桁加算器
 * carry_adder ... 16桁キャリールックアヘッド加算器
 * adder4_carry ... キャリールックアヘッド加算器用4bit加算器
 */
module testbench;
    logic [7:0] a, b, result, answer;
    logic [8:0] result3;
    logic cin;
    logic carry;
    int i, j, k;
    
    adder4 adder(a, b, result, carry);
    assign answer = a + b;
    assign result3 = {carry, result};
    
    initial begin
        $monitor("%02b+%02b -> %03b", a, b, result3);
            for (i = 0; i <= 2; i++) begin
                for (j = 0; j <= 2; j++) begin
                    a = i; b = j; cin = k;
                    #1;
                end
            end
        $finish;
    end
endmodule

module adder4_carry (
    input [7:0] A, B,
    input Cin,
    output [7:0] S,
    output C, P, G
)
    logic [4:0] c;
    logic [3:0] p, g;
    
    genvar i;
    generate
        for (i = 0; i < 4; i = i + 1) begin
            p[i] = (A[i*2+1] & ~A[i*2] & ~B[i*2+1] & B[i*2]) | (~A[i*2+1] & A[i*2] & B[i*2+1] & ~B[i*2]) | (A[i*2+1] & ~A[i*2] & B[i*2+1] & ~B[i*2]);
            g[i] = ~((~A[i*2+1] & ~A[i*2] & ~B[i*2+1] & ~B[i*2]) | (~A[i*2+1] & A[i*2] & ~B[i*2+1] & ~B[i*2]) | (~A[i*2+1] & ~A[i*2] & ~B[i*2+1] & B[i*2]));
            c[i+1] = (~c[i] & g[i]) | (p[i] & c[i]);
            S[i*2+1] = (((A[i*2+1] & ~A[i*2] & ~B[i*2+1] & ~B[i*2])
                    | (~A[i*2+1] & A[i*2] & ~B[i*2+1] & B[i*2])
                    | (~A[i*2+1] & ~A[i*2] & B[i*2+1] & ~B[i*2])) & ~c[i])
                    | (((~A[i*2+1] & A[i*2] & ~B[i*2+1] & ~B[i*2])
                    | (~A[i*2+1] & ~A[i*2] & ~B[i*2+1] & B[i*2])
                    | (A[i*2+1] & ~A[i*2] & B[i*2+1] & ~B[i*2])) & c[i]);
            S[i*2] = (((~A[i*2+1] & A[i*2] & ~B[i*2+1] & ~B[i*2])
                    | (~A[i*2+1] & ~A[i*2] & ~B[i*2+1] & B[i*2])
                    | (A[i*2+1] & ~A[i*2] & B[i*2+1] & ~B[i*2])) & ~c[i])
                    | (((~A[i*2+1] & ~A[i*2] & ~B[i*2+1] & ~B[i*2])
                    | (A[i*2+1] & ~A[i*2] & ~B[i*2+1] & B[i*2])
                    | (~A[i*2+1] & A[i*2] & B[i*2+1] & ~B[i*2])) & c[i]);
        end
    endgenerate
    assign c[0] = Cin;
    assign P = // TODO
endmodule

module adder4 (
    input [7:0] A, B,
    output [7:0] S,
    output C
);
    logic [2:0] carry;

    HA fa0(A[1:0], B[1:0], S[1:0], carry[0]);
    FA fa1(A[3:2], B[3:2], carry[0], S[3:2], carry[1]);
    FA fa2(A[5:4], B[5:4], carry[1], S[5:4], carry[2])
    FA fa3(A[7:6], B[7:6], carry[2], S[7:6], C);
endmodule

/**
00+00+00 -> 000
00+01+00 -> 001
00+10+00 -> 010
01+00+00 -> 001
01+01+00 -> 010
01+10+00 -> 100
10+00+00 -> 010
10+01+00 -> 100
10+10+00 -> 101
00+00+01 -> 001
00+01+01 -> 010
00+10+01 -> 100
01+00+01 -> 010
01+01+01 -> 100
01+10+01 -> 101
10+00+01 -> 100
10+01+01 -> 101
10+10+01 -> 110
*/
module FA (
    input [1:0] A, B,
    input Cin,
    output [1:0] S,
    output Cout
);

    assign S[1] = (((A[1] & ~A[0] & ~B[1] & ~B[0])
               | (~A[1] & A[0] & ~B[1] & B[0])
               | (~A[1] & ~A[0] & B[1] & ~B[0])) & ~Cin)
               | (((~A[1] & A[0] & ~B[1] & ~B[0])
               | (~A[1] & ~A[0] & ~B[1] & B[0])
               | (A[1] & ~A[0] & B[1] & ~B[0])) & Cin);
    assign S[0] = (((~A[1] & A[0] & ~B[1] & ~B[0])
               | (~A[1] & ~A[0] & ~B[1] & B[0])
               | (A[1] & ~A[0] & B[1] & ~B[0])) & ~Cin)
               | (((~A[1] & ~A[0] & ~B[1] & ~B[0])
               | (A[1] & ~A[0] & ~B[1] & B[0])
               | (~A[1] & A[0] & B[1] & ~B[0])) & Cin);
    assign Cout = (((A[1] & ~A[0] & ~B[1] & B[0])
               | (~A[1] & A[0] & B[1] & ~B[0])
               | (A[1] & ~A[0] & B[1] & ~B[0])) & ~Cin)
               | (~((~A[1] & ~A[0] & ~B[1] & ~B[0])
               | (~A[1] & A[0] & ~B[1] & ~B[0])
               | (~A[1] & ~A[0] & ~B[1] & B[0])) & Cin);
endmodule

/*
00+00 -> 000
00+01 -> 001
00+10 -> 010
01+00 -> 001
01+01 -> 010
01+10 -> 100
10+00 -> 010
10+01 -> 100
10+10 -> 101
*/
module HA (
    input [1:0] A, B,
    output [1:0] S,
    output Cout
);
   assign S[1] = (A[1] & ~A[0] & ~B[1] & ~B[0])
               | (~A[1] & A[0] & ~B[1] & B[0])
               | (~A[1] & ~A[0] & B[1] & ~B[0]);
   assign S[0] = (~A[1] & A[0] & ~B[1] & ~B[0])
               | (~A[1] & ~A[0] & ~B[1] & B[0])
               | (A[1] & ~A[0] & B[1] & ~B[0]); 
   assign Cout = (A[1] & ~A[0] & ~B[1] & B[0])
               | (~A[1] & A[0] & B[1] & ~B[0])
               | (A[1] & ~A[0] & B[1] & ~B[0]);
endmodule