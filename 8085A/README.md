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

<table width="98%" border="1" cellspacing="2" cellpadding="0">
  <caption align="TOP">Table 1. Pin Description</caption>
   
  <tbody>
  <tr>
    <td width="10%">A<sub>8</sub>-A<sub>15</sub></td> 
    <td width="4%" align="CENTER">O</td> 
    <td width="86%"><b>Address Bus:</b> The most significan 8 bits of the memory
    address or the 8 bits of the I/O address, 3-stated during Hold
    and Halt modes and during RESET.</td> 
  </tr>
  <tr>
    <td width="10%">AD<sub>0--7</sub></td> 
    <td width="4%" align="CENTER">I/O</td> 
    <td width="86%"><b>Multiplexed Address/Data Bus:</b> Lower 8 bits of the memory
    address (or I/O address) appear on the bus furing the first clock
    cycle (T state) of a machine Cycle. It then becomes the data
    bus furing the second and third clock cycles.</td> 
  </tr>
  <tr>
    <td width="10%">ALE</td>
    <td width="4%" align="CENTER">O</td> 
    <td width="86%"><b>Address Latch Enable:</b> It occurs during the first clock
    state of a machine cycle and enables the address to get latched
    into the on-chip latch of peripherals. The falling edge of ALE
    is set to guarantee setup and hold times for the address information.
    The falling edge of ALE can also be used to strobe the status
    information. ALE is never 3-stated.</td> 
  </tr>
  <tr>
    <td width="10%">S<sub>0</sub>,S<sub>1</sub> and IO/<o>M</o></td> 
    <td width="4%" align="CENTER">O</td> 
    <td width="86%"><b>Machine Cycle Status:</b><br>
    <table width="43%" border="1" cellspacing="2" cellpadding="0" height="350">
      <tbody>
      <tr>
        <td width="8%" height="23">
        IO/<b><u>M</u></b></td> 
        <td width="10%" height="23">
        S1</td> 
        <td width="10%" height="23">
        S0</td> 
        <td width="72%" height="23">
        &nbsp;Status</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        0</td> 
        <td width="10%" height="23">
        0</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="72%" height="23">
        Memory Write</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        0</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="10%" height="23">
        0</td> 
        <td width="72%" height="23">
        Memory Read</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        1</td> 
        <td width="10%" height="23">
        0</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="72%" height="23">
        I/O Write</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        1</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="10%" height="23">
        0</td> 
        <td width="72%" height="23">
        I/O Read</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        &nbsp;0</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="72%" height="23">
        Opcode fetch</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        1</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="72%" height="23">
        Opcode fetch</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        1</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="10%" height="23">
        1</td> 
        <td width="72%" height="23">
        Interrupt Acknlo.</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        *</td> 
        <td width="10%" height="23">
        0</td> 
        <td width="10%" height="23">
        0</td> 
        <td width="72%" height="23">
        Halt</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        *</td> 
        <td width="10%" height="23">
        X</td> 
        <td width="10%" height="23">
        X</td> 
        <td width="72%" height="23">
        Hold</td> 
      </tr>
      <tr>
        <td width="8%" height="23">
        *</td> 
        <td width="10%" height="23">
        X</td> 
        <td width="10%" height="23">
        X</td> 
        <td width="72%" height="23">
        Reset</td> 
      </tr>
      <tr>
        <td rowspan="3">* = 3-state (high impedance)</td>
      </tr>
      <tr>
        <td rowspan="3">X = unspecified</td>
      </tr>
    </tbody></table>

    S1 can be used as an advanced R/<b><u>W</u></b> status. IO/<b><u>M</u></b>,
    S0 and s1 become valid at the beginning of a machine cycle and
    remain stable throughout the cycle. The falling edge of ALE may
    be used to latch the state of these lines.
    </td> 
  </tr>
  <tr>
    <td width="10%">
    <b><u>RD</u></b></td> 
    <td width="4%" align="CENTER">
    O</td> 
    <td width="86%">
    <b>Read Control:</b>A low level on <b><u>RD</u></b> indicates
    the selected memory or I/O device is to be read and that the
    Data Bus is available for the ata transfer, 3-stated during Hold
    and Halt modes and during RESET.</td> 
  </tr>
  <tr>
    <td width="10%">
    <b><u>WR</u></b></td> 
    <td width="4%" align="CENTER">
    O</td> 
    <td width="86%">
    <b>Write Control:</b> A low level on <b><u>WR</u></b> indicates
    the data on the Data Bus is to be written into the selected memory
    or I/O location. Data is set up at the trailing edge of <b><u>WR</u></b>.
    3-stated during Hold and Halt modes and during RESET.</td> 
  </tr>
  <tr>
    <td width="10%">
    READY</td> 
    <td width="4%" align="CENTER">
    I</td> 
    <td width="86%">
    <b>Ready:</b> If READY is high during a read or write cycle,
    it indicates that the momory or peripheral is ready to send or
    receive data. If READY is low, the cpu will wait an integral
    number of clock cycles for READY to go high before completing
    the read or write cycle. READY must conform to specified setup
    and hold times.</td> 
  </tr>
  <tr>
    <td width="10%">
    HOLD</td> 
    <td width="4%" align="CENTER">
    I</td> 
    <td width="86%">
    <b>Hold:</b> Indicates that another master is requesting the
    use of the address and data buses. The cpu, upon receiving the
    hold request, will relinquish the use of the bus as soon as the
    completion of the current bus transfer. Internal processing can
    continue. The processor can ragain the bus only after the HOLD
    is remobed. When the HOLD is acknowledged, the Address, Data,
    <b><u>RD, WR </u></b>, and IO/<b><u>M</u></b> lines are 3-stated</td> 
  </tr>
  <tr>
    <td width="10%">
    HLDA</td> 
    <td width="4%" align="CENTER">
    O</td> 
    <td width="86%">
    <b>Hold Acknowledge:</b> Indicates that the cpu has received
    the HOLD request and that it will relinquish the bus in the next
    clock cycle. HLDA goes low after the Hold request is removed.
    The Cpu tekes the bus one half clock cycle after HLDA goes low.</td> 
  </tr>
  <tr>
    <td width="10%">
    INTR</td> 
    <td width="4%" align="CENTER">
    I</td> 
    <td width="86%">
    <b>Interrupt request:</b> Is used as a general purpose Interrupt.
    It is sampled only during the next to the last clock cycle of
    an instruction and during the next to the last clock cycle of
    an instrucion and during HOld and Halt states. IF it is active,
    the Program Counter (PC) will be inhibited from incrementing
    and an <b><u>INTA</u></b> will be issued. During this cycle a
    RESTART or CALL instruction can be inserted to jump to the interrupt
    service routing. The INTR is enabled and disabled by software.
    It is isabled by Reset and immediately after an interrupt is
    accepted.</td> 
  </tr>
  <tr>
    <td width="10%">
    <b><u>INTA</u></b></td> 
    <td width="4%" align="CENTER">
    O</td> 
    <td width="86%">
    <b>Interrupt Acknowledge:</b> Is used instead of (and has the
    same timing as)<b> <u>RD</u></b> during the instruction cycle
    after an INTR is accepted. It can be used to activate an 8259A
    Interrupt chip or some other interrupt port.</td> 
  </tr>
  <tr>
    <td width="10%">
    RST 5.5<br>
    RST 6.5<br>
    RST 7.5</td> 
    <td width="4%" align="CENTER">
    I</td> 
    <td width="86%">
    <b>Restart Interrupts:</b> These three intputs have the same
    timings as INTR except they cause an internal RESTART to be automatically
    inserted. The priority of these interrupts is ordered as shown
    in Table 2. These interrupts have a higher priority then INTR,
    In addition, they may be individually masked out using the SIM
    instruction.</td> 
  </tr>
  <tr>
    <td width="10%">
    TRAP&nbsp;</td> 
    <td width="4%" align="CENTER">
    I</td> 
    <td width="86%">
    <b>Trap: </b>Trap interrupt is a non-maskable RESTART interrupt.
    It is recognized at the same time as INTR or RST5.5-7.5. It is
    unaffecte by any mask or interrupt Enable. It has the highest
    priority of any interrupt. (see Table 2.)</td> 
  </tr>
  <tr>
    <td width="10%">
    <b><u>RESET IN</u></b></td> 
    <td width="4%" align="CENTER">
    I</td> 
    <td width="86%">
    <b>Reset In:</b> Sets the Program Counter to zero and resets
    the interrupt Enable and HOLD flip-flops. The data and adress
    buses and the control lines are 3-stated during RESET and because
    of the asynchronous nature of RESET, the processor's internal
    registers and flags may be altered by RESET with unpredictable
    results. <b><u>RESET IN</u></b> is a Schmitt-triggered input,
    allowing connection to an R-C network for power-on RESET delay.
    The cpu is held in the reset condition as long as <b><u>RESET
    IN</u></b> is applied.</td> 
  </tr>
  <tr>
    <td width="10%">
    RESET OUT</td> 
    <td width="4%" align="CENTER">
    O</td> 
    <td width="86%">
    <b>Reset Out:</b> Reset Out indicates cpu is being reset. Can
    be used as a system reset. The signal is synchronized to the
    processor clock and lasts an integral number of clock periods.</td> 
  </tr>
  <tr>
    <td width="10%">
    X1,X2</td> 
    <td width="4%" align="CENTER">
    I</td> 
    <td width="86%">
    <b>X1 and X2:</b> Are connected to a crystal, LC or RC network
    to drive the internal clock generator. X1 can also be an external
    clock input from a logic gate. The input frequency is divided
    by 2 to give the processor's internal operating frequency.</td> 
  </tr>
  <tr>
    <td width="10%">
    CLK</td> 
    <td width="4%" align="CENTER">
    O</td> 
    <td width="86%">
    <b>Clock:</b> Clock output for use as a system clock. The period
    of CLK is twice the X1,X2 input period.</td> 
  </tr>
  <tr>
    <td width="10%">
    SID</td> 
    <td width="4%" align="CENTER">
    I</td> 
    <td width="86%">
    <b>Serial Input Data Line</b>: The data on this line is loaded
    into accumulator bit 7 whenever a RIM instruction is executed</td> 
  </tr>
  <tr>
    <td width="10%">
    SOD</td> 
    <td width="4%" align="CENTER">
    O</td> 
    <td width="86%">
    <b>Serial Output Data Line:</b> The putput SOD is set or reset
    as specified by the SIM instruction.</td> 
  </tr>
  <tr>
    <td width="10%">
    VCC</td> 
    <td width="4%" align="CENTER">
    &nbsp;</td> 
    <td width="86%">
    <b>Power:</b> +5 volt supply.</td> 
  </tr>
  <tr>
    <td width="10%">
    VSS</td> 
    <td width="4%" align="CENTER">
    &nbsp;</td> 
    <td width="86%">
    <b>Ground:</b> Reference</td> 
  </tr>
</tbody></table>

<table width="98%" border="1" cellspacing="2" cellpadding="0">
  <caption align="TOP"><b><font face="Arial">Table 2. Interrupt Priority, Restart Address,
and Sensitivity</font></b></caption>
   
  <tbody><tr>
    <th width="10%">
    &nbsp;Name</th> 
    <th width="11%">
    Priority</th> 
    <th width="20%">
    Address Branched To (1) When Interrupt Occurs</th> 
    <th width="59%">
    Type Trigger</th> 
  </tr>
  <tr>
    <td width="10%" align="CENTER">
    TRAP</td> 
    <td width="11%" align="CENTER">
    1</td> 
    <td width="20%" align="CENTER">
    24H</td> 
    <td width="59%">
    Rising edge AND high level until sampled.</td> 
  </tr>
  <tr>
    <td width="10%" align="CENTER">
    RST 7.5</td> 
    <td width="11%" align="CENTER">
    2</td> 
    <td width="20%" align="CENTER">
    3CH</td> 
    <td width="59%">
    Rising edge (latched).</td> 
  </tr>
  <tr>
    <td width="10%" align="CENTER">
    RST 6.5</td> 
    <td width="11%" align="CENTER">
    3</td> 
    <td width="20%" align="CENTER">
    34H</td> 
    <td width="59%">
    High level until sampled.</td> 
  </tr>
  <tr>
    <td width="10%" align="CENTER">
    RST 5.5</td> 
    <td width="11%" align="CENTER">
    4</td> 
    <td width="20%" align="CENTER">
    2CH</td> 
    <td width="59%">
    High level until sampled.</td> 
  </tr>
  <tr>
    <td width="10%" align="CENTER">
    INTR</td> 
    <td width="11%" align="CENTER">
    5</td> 
    <td width="20%" align="CENTER">
    See Note (2).</td> 
    <td width="59%">
    High level until sampled.</td> 
  </tr>
</tbody></table>

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

The 8085A provides <o>RD</o>, <o>WR</o>, S<sub>0</sub>, S<sub>1</sub> and IO/<o>M</o> signals for bus control.
An interrupt acknowledge signal (<o>INTA</o>) is also provided.
HOLD and all interrupts are synchronized with the processor's internal clock.
The 8085A also provides serial Input Data (SID) and Serial Output Data (SOD) lines for simple serial interface.

In addition to these features, the 8085A has three maskable, vector interrupts pins and on nonmaskable TRAP interrupt.

## INTERRUPT AND SERIAL I/O





