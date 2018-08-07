module testbench;
    logic a, b, cin, s, cout;
    FA adder(.A(a), .B(b), .Cin(cin), .S(s), .Cout(cout));
    
    initial begin
        $display("A B Ci    Co S");
        $monitor("%b %b %b  -> %b  %b", a, b, cin, cout, s);
        a = 0; b = 0; cin = 0; #10;
        a = 0; b = 1; cin = 0; #10;
        a = 1; b = 0; cin = 0; #10;
        a = 1; b = 1; cin = 0; #10;
        a = 0; b = 0; cin = 1; #10;
        a = 0; b = 1; cin = 1; #10;
        a = 1; b = 0; cin = 1; #10;
        a = 1; b = 1; cin = 1; #10;
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