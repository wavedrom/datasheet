# 8085A/8085A-2 SINGLE CHIP 8-BIT N-CHANNEL MICROPROCESSORS

 * Single +5V Power Supply
 * 100% Software Compatible with 8080A
 * 1.3 µS Instruciont Cycle (8085A); 0.8 µS (8085A-2)
 * On-Chip Clock Generator (With External Crystal, LC or RC Network)
 * On-Chip System Controller; Advanced Cycle Status Information Available for Large System Control
 * Four Vectored Interrupt Inputs (one is Non-Maskable) Plus an 8080A-Compatible Interrupt
 * Serial In/Serial Out Port
 * Decimal, Binary and Double Precision Arithmetic
 * Direct Addressing Capability to 64K Bytes of Memory

The Intel® 8085A is a complete 8 bit parallel Central Processing Unit (CPU).
Its instruction set is 100% software compatible with the 8080A microprocessor, and it is designed to improve the present 8080A's performance by higher system speed.
Its high level of system integration allows a minimum system of three IC's (8085A (CPU), 8156 (RAM/IO) and 8355/8755A (ROM/PROM/IO) while maintaining total system expandability.
The 8085A-2 is a faster version of the 8085A.

The 8085A incorporates all of the features that the 8224 (clock generator) and 8228 (System controller) provede for the 8080A, Thereby offering a high level of system integration.

The 8085A uses a multiplexed data bus. The address is split between the 8 bit address bus and the 8 bit data bus. The on-chip address latches of 8155/8156/8355/8755A memory products allow a direct interface with the 8085A.

---

![Fig1](fig1.png)

---

Table 1.

Tbale 2.

NOTES:
1. the processor pushes the PC on the stack before branching to the indicated address.
2. The address branched to depends on the instruction provided to the cpu when the interrupt is acknowledged.

## FUNCTIONAL DESCRIPTION

The 8085A is a complete 8-bit parallel central processor. It is designed with N-channel depletion loads and requires a single +5 volt supply. Its basic clock speed is 3Mhz (8085A) or 5MHZ (8085A-2), thus improving on the present 8080A's performance with hight system speed. Also it is designed to fit into a minimum system of three IC's: The cpu (8085A), a RAM/IO (8156), and a ROM or EPROM /IO chip (8355 or 8755A).

The 8085A has twelve addressable 8-bit registers. our of them can funtion only as two 16-bit register pairs. Six other can be used interchangeably as a 8-bit register or a 16-bit register pairs. The 8085A register set is as follows:

| Mnemonic	 | Register	       | Contents        |
|------------|-----------------|-----------------|
| ACC or A	 | Accumulator	   | 8 bits          |
| PC	       | Program Counter | 16-bit address  |
| BC, DE, HL | General-Purpose Registers; data pointer (HL)	| 8 bits x 6 or 16 bits x 3 |
| SP         | Stack Pointer	 | 16-bit address  |
| Flags or F | Flag Register	 | 5 flags (8 bit space) |

The 8085A uses a multiplexed Data Bus. The address is split between the higher 8-bit Address Bus and the lower 8-bit Address/Data Bus. During the first T state (clock cycle) of a machine cycle the low order address is sent out on the Address/Data bus. These lower 8 bits may be latched externally by the Address Latch Enable signal (ALE). During the resto of the machine cycle the data bus is used for memory or I/O data.

The 8085A provides RW, WR S0, S1 and IO/M signals for bus contro. An interrupt acknowledge signale (INTA) is also provided. HOLD and all interrupts are synchronized with the processor's internal clock. The 8085A also provides serial Input Data (SID) and Serial Output Data (SOD) lines for simple serial interface.

In addition to these features, the 8085A has three maskable, vector interrupts pins and on nonmaskable TRAP interrupt.



