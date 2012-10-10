/**
 * Autogenerated by Thrift Compiler (0.7.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 */
package com.continuuity.metrics2.stubs;

import org.apache.commons.lang.builder.HashCodeBuilder;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.EnumMap;
import java.util.Set;
import java.util.HashSet;
import java.util.EnumSet;
import java.util.Collections;
import java.util.BitSet;
import java.nio.ByteBuffer;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Collection of data points for a given metric.
 */
public class DataPoints implements org.apache.thrift.TBase<DataPoints, DataPoints._Fields>, java.io.Serializable, Cloneable {
  private static final org.apache.thrift.protocol.TStruct STRUCT_DESC = new org.apache.thrift.protocol.TStruct("DataPoints");

  private static final org.apache.thrift.protocol.TField POINTS_FIELD_DESC = new org.apache.thrift.protocol.TField("points", org.apache.thrift.protocol.TType.MAP, (short)1);
  private static final org.apache.thrift.protocol.TField LATEST_FIELD_DESC = new org.apache.thrift.protocol.TField("latest", org.apache.thrift.protocol.TType.MAP, (short)2);

  private Map<String,List<DataPoint>> points; // required
  private Map<String,Double> latest; // required

  /** The set of fields this struct contains, along with convenience methods for finding and manipulating them. */
  public enum _Fields implements org.apache.thrift.TFieldIdEnum {
    POINTS((short)1, "points"),
    LATEST((short)2, "latest");

    private static final Map<String, _Fields> byName = new HashMap<String, _Fields>();

    static {
      for (_Fields field : EnumSet.allOf(_Fields.class)) {
        byName.put(field.getFieldName(), field);
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, or null if its not found.
     */
    public static _Fields findByThriftId(int fieldId) {
      switch(fieldId) {
        case 1: // POINTS
          return POINTS;
        case 2: // LATEST
          return LATEST;
        default:
          return null;
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, throwing an exception
     * if it is not found.
     */
    public static _Fields findByThriftIdOrThrow(int fieldId) {
      _Fields fields = findByThriftId(fieldId);
      if (fields == null) throw new IllegalArgumentException("Field " + fieldId + " doesn't exist!");
      return fields;
    }

    /**
     * Find the _Fields constant that matches name, or null if its not found.
     */
    public static _Fields findByName(String name) {
      return byName.get(name);
    }

    private final short _thriftId;
    private final String _fieldName;

    _Fields(short thriftId, String fieldName) {
      _thriftId = thriftId;
      _fieldName = fieldName;
    }

    public short getThriftFieldId() {
      return _thriftId;
    }

    public String getFieldName() {
      return _fieldName;
    }
  }

  // isset id assignments

  public static final Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> metaDataMap;
  static {
    Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> tmpMap = new EnumMap<_Fields, org.apache.thrift.meta_data.FieldMetaData>(_Fields.class);
    tmpMap.put(_Fields.POINTS, new org.apache.thrift.meta_data.FieldMetaData("points", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.MapMetaData(org.apache.thrift.protocol.TType.MAP, 
            new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.STRING), 
            new org.apache.thrift.meta_data.ListMetaData(org.apache.thrift.protocol.TType.LIST, 
                new org.apache.thrift.meta_data.StructMetaData(org.apache.thrift.protocol.TType.STRUCT, DataPoint.class)))));
    tmpMap.put(_Fields.LATEST, new org.apache.thrift.meta_data.FieldMetaData("latest", org.apache.thrift.TFieldRequirementType.DEFAULT, 
        new org.apache.thrift.meta_data.MapMetaData(org.apache.thrift.protocol.TType.MAP, 
            new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.STRING), 
            new org.apache.thrift.meta_data.FieldValueMetaData(org.apache.thrift.protocol.TType.DOUBLE))));
    metaDataMap = Collections.unmodifiableMap(tmpMap);
    org.apache.thrift.meta_data.FieldMetaData.addStructMetaDataMap(DataPoints.class, metaDataMap);
  }

  public DataPoints() {
  }

  public DataPoints(
    Map<String,List<DataPoint>> points,
    Map<String,Double> latest)
  {
    this();
    this.points = points;
    this.latest = latest;
  }

  /**
   * Performs a deep copy on <i>other</i>.
   */
  public DataPoints(DataPoints other) {
    if (other.isSetPoints()) {
      Map<String,List<DataPoint>> __this__points = new HashMap<String,List<DataPoint>>();
      for (Map.Entry<String, List<DataPoint>> other_element : other.points.entrySet()) {

        String other_element_key = other_element.getKey();
        List<DataPoint> other_element_value = other_element.getValue();

        String __this__points_copy_key = other_element_key;

        List<DataPoint> __this__points_copy_value = new ArrayList<DataPoint>();
        for (DataPoint other_element_value_element : other_element_value) {
          __this__points_copy_value.add(new DataPoint(other_element_value_element));
        }

        __this__points.put(__this__points_copy_key, __this__points_copy_value);
      }
      this.points = __this__points;
    }
    if (other.isSetLatest()) {
      Map<String,Double> __this__latest = new HashMap<String,Double>();
      for (Map.Entry<String, Double> other_element : other.latest.entrySet()) {

        String other_element_key = other_element.getKey();
        Double other_element_value = other_element.getValue();

        String __this__latest_copy_key = other_element_key;

        Double __this__latest_copy_value = other_element_value;

        __this__latest.put(__this__latest_copy_key, __this__latest_copy_value);
      }
      this.latest = __this__latest;
    }
  }

  public DataPoints deepCopy() {
    return new DataPoints(this);
  }

  @Override
  public void clear() {
    this.points = null;
    this.latest = null;
  }

  public int getPointsSize() {
    return (this.points == null) ? 0 : this.points.size();
  }

  public void putToPoints(String key, List<DataPoint> val) {
    if (this.points == null) {
      this.points = new HashMap<String,List<DataPoint>>();
    }
    this.points.put(key, val);
  }

  public Map<String,List<DataPoint>> getPoints() {
    return this.points;
  }

  public void setPoints(Map<String,List<DataPoint>> points) {
    this.points = points;
  }

  public void unsetPoints() {
    this.points = null;
  }

  /** Returns true if field points is set (has been assigned a value) and false otherwise */
  public boolean isSetPoints() {
    return this.points != null;
  }

  public void setPointsIsSet(boolean value) {
    if (!value) {
      this.points = null;
    }
  }

  public int getLatestSize() {
    return (this.latest == null) ? 0 : this.latest.size();
  }

  public void putToLatest(String key, double val) {
    if (this.latest == null) {
      this.latest = new HashMap<String,Double>();
    }
    this.latest.put(key, val);
  }

  public Map<String,Double> getLatest() {
    return this.latest;
  }

  public void setLatest(Map<String,Double> latest) {
    this.latest = latest;
  }

  public void unsetLatest() {
    this.latest = null;
  }

  /** Returns true if field latest is set (has been assigned a value) and false otherwise */
  public boolean isSetLatest() {
    return this.latest != null;
  }

  public void setLatestIsSet(boolean value) {
    if (!value) {
      this.latest = null;
    }
  }

  public void setFieldValue(_Fields field, Object value) {
    switch (field) {
    case POINTS:
      if (value == null) {
        unsetPoints();
      } else {
        setPoints((Map<String,List<DataPoint>>)value);
      }
      break;

    case LATEST:
      if (value == null) {
        unsetLatest();
      } else {
        setLatest((Map<String,Double>)value);
      }
      break;

    }
  }

  public Object getFieldValue(_Fields field) {
    switch (field) {
    case POINTS:
      return getPoints();

    case LATEST:
      return getLatest();

    }
    throw new IllegalStateException();
  }

  /** Returns true if field corresponding to fieldID is set (has been assigned a value) and false otherwise */
  public boolean isSet(_Fields field) {
    if (field == null) {
      throw new IllegalArgumentException();
    }

    switch (field) {
    case POINTS:
      return isSetPoints();
    case LATEST:
      return isSetLatest();
    }
    throw new IllegalStateException();
  }

  @Override
  public boolean equals(Object that) {
    if (that == null)
      return false;
    if (that instanceof DataPoints)
      return this.equals((DataPoints)that);
    return false;
  }

  public boolean equals(DataPoints that) {
    if (that == null)
      return false;

    boolean this_present_points = true && this.isSetPoints();
    boolean that_present_points = true && that.isSetPoints();
    if (this_present_points || that_present_points) {
      if (!(this_present_points && that_present_points))
        return false;
      if (!this.points.equals(that.points))
        return false;
    }

    boolean this_present_latest = true && this.isSetLatest();
    boolean that_present_latest = true && that.isSetLatest();
    if (this_present_latest || that_present_latest) {
      if (!(this_present_latest && that_present_latest))
        return false;
      if (!this.latest.equals(that.latest))
        return false;
    }

    return true;
  }

  @Override
  public int hashCode() {
    HashCodeBuilder builder = new HashCodeBuilder();

    boolean present_points = true && (isSetPoints());
    builder.append(present_points);
    if (present_points)
      builder.append(points);

    boolean present_latest = true && (isSetLatest());
    builder.append(present_latest);
    if (present_latest)
      builder.append(latest);

    return builder.toHashCode();
  }

  public int compareTo(DataPoints other) {
    if (!getClass().equals(other.getClass())) {
      return getClass().getName().compareTo(other.getClass().getName());
    }

    int lastComparison = 0;
    DataPoints typedOther = (DataPoints)other;

    lastComparison = Boolean.valueOf(isSetPoints()).compareTo(typedOther.isSetPoints());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetPoints()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.points, typedOther.points);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = Boolean.valueOf(isSetLatest()).compareTo(typedOther.isSetLatest());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetLatest()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.latest, typedOther.latest);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    return 0;
  }

  public _Fields fieldForId(int fieldId) {
    return _Fields.findByThriftId(fieldId);
  }

  public void read(org.apache.thrift.protocol.TProtocol iprot) throws org.apache.thrift.TException {
    org.apache.thrift.protocol.TField field;
    iprot.readStructBegin();
    while (true)
    {
      field = iprot.readFieldBegin();
      if (field.type == org.apache.thrift.protocol.TType.STOP) { 
        break;
      }
      switch (field.id) {
        case 1: // POINTS
          if (field.type == org.apache.thrift.protocol.TType.MAP) {
            {
              org.apache.thrift.protocol.TMap _map4 = iprot.readMapBegin();
              this.points = new HashMap<String,List<DataPoint>>(2*_map4.size);
              for (int _i5 = 0; _i5 < _map4.size; ++_i5)
              {
                String _key6; // required
                List<DataPoint> _val7; // required
                _key6 = iprot.readString();
                {
                  org.apache.thrift.protocol.TList _list8 = iprot.readListBegin();
                  _val7 = new ArrayList<DataPoint>(_list8.size);
                  for (int _i9 = 0; _i9 < _list8.size; ++_i9)
                  {
                    DataPoint _elem10; // required
                    _elem10 = new DataPoint();
                    _elem10.read(iprot);
                    _val7.add(_elem10);
                  }
                  iprot.readListEnd();
                }
                this.points.put(_key6, _val7);
              }
              iprot.readMapEnd();
            }
          } else { 
            org.apache.thrift.protocol.TProtocolUtil.skip(iprot, field.type);
          }
          break;
        case 2: // LATEST
          if (field.type == org.apache.thrift.protocol.TType.MAP) {
            {
              org.apache.thrift.protocol.TMap _map11 = iprot.readMapBegin();
              this.latest = new HashMap<String,Double>(2*_map11.size);
              for (int _i12 = 0; _i12 < _map11.size; ++_i12)
              {
                String _key13; // required
                double _val14; // required
                _key13 = iprot.readString();
                _val14 = iprot.readDouble();
                this.latest.put(_key13, _val14);
              }
              iprot.readMapEnd();
            }
          } else { 
            org.apache.thrift.protocol.TProtocolUtil.skip(iprot, field.type);
          }
          break;
        default:
          org.apache.thrift.protocol.TProtocolUtil.skip(iprot, field.type);
      }
      iprot.readFieldEnd();
    }
    iprot.readStructEnd();
    validate();
  }

  public void write(org.apache.thrift.protocol.TProtocol oprot) throws org.apache.thrift.TException {
    validate();

    oprot.writeStructBegin(STRUCT_DESC);
    if (this.points != null) {
      oprot.writeFieldBegin(POINTS_FIELD_DESC);
      {
        oprot.writeMapBegin(new org.apache.thrift.protocol.TMap(org.apache.thrift.protocol.TType.STRING, org.apache.thrift.protocol.TType.LIST, this.points.size()));
        for (Map.Entry<String, List<DataPoint>> _iter15 : this.points.entrySet())
        {
          oprot.writeString(_iter15.getKey());
          {
            oprot.writeListBegin(new org.apache.thrift.protocol.TList(org.apache.thrift.protocol.TType.STRUCT, _iter15.getValue().size()));
            for (DataPoint _iter16 : _iter15.getValue())
            {
              _iter16.write(oprot);
            }
            oprot.writeListEnd();
          }
        }
        oprot.writeMapEnd();
      }
      oprot.writeFieldEnd();
    }
    if (this.latest != null) {
      oprot.writeFieldBegin(LATEST_FIELD_DESC);
      {
        oprot.writeMapBegin(new org.apache.thrift.protocol.TMap(org.apache.thrift.protocol.TType.STRING, org.apache.thrift.protocol.TType.DOUBLE, this.latest.size()));
        for (Map.Entry<String, Double> _iter17 : this.latest.entrySet())
        {
          oprot.writeString(_iter17.getKey());
          oprot.writeDouble(_iter17.getValue());
        }
        oprot.writeMapEnd();
      }
      oprot.writeFieldEnd();
    }
    oprot.writeFieldStop();
    oprot.writeStructEnd();
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder("DataPoints(");
    boolean first = true;

    sb.append("points:");
    if (this.points == null) {
      sb.append("null");
    } else {
      sb.append(this.points);
    }
    first = false;
    if (!first) sb.append(", ");
    sb.append("latest:");
    if (this.latest == null) {
      sb.append("null");
    } else {
      sb.append(this.latest);
    }
    first = false;
    sb.append(")");
    return sb.toString();
  }

  public void validate() throws org.apache.thrift.TException {
    // check for required fields
  }

  private void writeObject(java.io.ObjectOutputStream out) throws java.io.IOException {
    try {
      write(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(out)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private void readObject(java.io.ObjectInputStream in) throws java.io.IOException, ClassNotFoundException {
    try {
      read(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(in)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

}

