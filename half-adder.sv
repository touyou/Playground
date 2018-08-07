module testbench;
    logic a, b, c, s;
    HA adder(.A(a), .B(b), .C(c), .S(s));
    
    initial begin
       $display("A B    C S");
       $monitor("%b %b -> %b %b", a, b, c, s);
       a = 0; b = 0; #10;
       a = 0; b = 1; #10;
       a = 1; b = 0; #10;
       a = 1; b = 1; #10;
       $finish;
    end
endmodule

module HA (
    input A, B,
    output S, C
);
  assign S = A ^ B;
  assign C = A & B;  
endmodule